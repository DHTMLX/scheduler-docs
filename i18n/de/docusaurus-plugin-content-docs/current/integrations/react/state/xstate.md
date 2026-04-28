--- 
title: React Scheduler – XState Tutorial
sidebar_label: XState
description: "Integriere React Scheduler mit XState. Behandelt das Modellieren des Scheduler-Zustands in einer Maschine, das CRUD-Handling über data.save und das Hinzufügen von Undo/Redo + benutzerdefinierter Navigation."
---

# React Scheduler – XState Tutorial

Dieses Tutorial zeigt, wie Sie den **DHTMLX React Scheduler** mit einer **XState**-Zustandsmaschine verbinden. Sie speichern Ereignisse und UI-Zustände (Ansicht/Datum/Konfiguration) in der Maschine, leiten Scheduler-Bearbeitungen über `data.save` und fügen **Undo/Redo** mit einer snapshot-basierten History hinzu.

:::note
Der vollständige Quellcode ist [auf GitHub verfügbar](https://github.com/DHTMLX/react-scheduler-xstate-starter).
:::

## Voraussetzungen

- Node.js (LTS empfohlen)
- Grundlagen von React + TypeScript
- XState-Grundlagen (Maschinen, Ereignisse, Aktionen). Falls Sie eine Auffrischung benötigen, siehe die XState-Dokumentation: https://stately.ai/docs/xstate

## Schnellsetup – Projekt erstellen

Erstellen Sie ein Vite + React + TS-Projekt:

~~~bash
npm create vite@latest scheduler-xstate-demo -- --template react-ts
cd scheduler-xstate-demo
npm install
~~~

Installieren Sie XState + React-Bindings:

~~~bash
npm install xstate @xstate/react
~~~

Installieren Sie Material UI (verwendet in der Demo-Werkzeugleiste):

~~~bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

### Installation von React Scheduler

Installieren Sie React Scheduler wie im [React Scheduler-Installationsleitfaden](integrations/react/installation.md) beschrieben.

In diesem Tutorial verwenden wir das Evaluierungs-/Trial-Paket:

```bash
npm install @dhtmlx/trial-react-scheduler
```

oder

```bash
yarn add @dhtmlx/trial-react-scheduler
```

Wenn Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-react-scheduler` durch `@dhx/react-scheduler` in den Befehlen und Imports.

Starten Sie den Entwicklungsserver:

~~~bash
npm run dev
~~~

:::note
Um Scheduler die gesamte Seite nutzen zu lassen, entfernen Sie die Standard-Stile aus `src/App.css` und fügen Sie Folgendes hinzu:

~~~css
#root {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

body {
  margin: 0;
}
~~~
:::

## Einrichtung von Beispieldaten

Erstellen Sie `src/seed/data.ts` mit einigen Ereignissen und einem initialen UI-Zustand. Beachten Sie, dass `date` als **Zahl** (Zeitstempel) gespeichert wird, damit der Maschinenkontext serialisierbar bleibt.

~~~ts title="src/seed/data.ts"
export type SchedulerView = "day" | "week" | "month";
export type SchedulerConfig = Record<string, unknown>;

export interface SchedulerEvent {
  id: string | number;
  start_date: string;
  end_date: string;
  text: string;
  [key: string]: unknown;
}

export const seedEvents: SchedulerEvent[] = [
  { id: 1, classname: "blue", start_date: "2025-08-11T02:00:00Z", end_date: "2025-08-11T10:20:00Z", text: "Product Strategy Hike" },
  { id: 2, classname: "violet", start_date: "2025-08-12T06:00:00Z", end_date: "2025-08-12T11:00:00Z", text: "Tranquil Tea Time" },
  { id: 3, classname: "blue", start_date: "2025-08-15T03:00:00Z", end_date: "2025-08-15T08:00:00Z", text: "Demo and Showcase" },
];

export const seedDate = Date.parse("2025-08-15T00:00:00Z");
export const seedView: SchedulerView = "week";
~~~

- `SchedulerEvent` verwendet eine Index-Signatur, damit Scheduler zusätzliche Felder zur Laufzeit anhängen kann.

:::note
Die Begleit-Demo enthält zusätzliche Ereignisse mit Farbkassen für eine reichhaltigere Visualisierung.
:::

## Einrichtung der XState-Maschine

Erstellen Sie `src/machine.ts`. Diese Maschine speichert:

- `events` (Scheduler-Daten)
- `date` (als Zeitstempel)
- `view` (`day | week | month`)
- `config` (Scheduler-Konfigurationsobjekt)
- `past` / `future` (Snapshot-Arrays für Undo/Redo)

Undo/Redo ist direkt in die Maschine integriert und verwendet Snapshots. Vor jeder datenverändernden Aktion speichert `saveToHistory` einen Snapshot der aktuellen Ereignisse, Ansicht und Datum. Die `undo`- und `redo`-Übergänge tauschen den aktuellen Zustand gegen einen Snapshot aus der History ein.

~~~ts title="src/machine.ts"
import { createMachine, assign } from "xstate";
import {
  seedEvents,
  seedView,
  seedDate,
  type SchedulerView,
  type SchedulerEvent,
  type SchedulerConfig,
} from "./seed/data";

export interface SchedulerMachineContext {
  events: SchedulerEvent[];
  view: SchedulerView;
  date: number;
  config: SchedulerConfig;
  past: SchedulerSnapshot[];
  future: SchedulerSnapshot[];
  maxHistory: number;
}

interface SchedulerSnapshot {
  events: SchedulerEvent[];
  view: SchedulerView;
  date: number;
}

type SchedulerMachineEvent =
  | { type: "SET_VIEW"; view: SchedulerView }
  | { type: "SET_DATE"; date: number }
  | { type: "CREATE_EVENT"; event: SchedulerEvent }
  | { type: "UPDATE_EVENT"; event: SchedulerEvent }
  | { type: "DELETE_EVENT"; id: string | number }
  | { type: "UNDO" }
  | { type: "REDO" };

const deepClone = <T,>(value: T): T => {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value)) as T;
};

const takeSnapshot = (ctx: SchedulerMachineContext): SchedulerSnapshot => ({
  events: deepClone(ctx.events),
  view: ctx.view,
  date: ctx.date,
});

export const schedulerMachine = createMachine({
  id: "scheduler",
  types: {
    context: {} as SchedulerMachineContext,
    events: {} as SchedulerMachineEvent,
  },
  context: {
    events: seedEvents,
    view: seedView,
    date: seedDate,
    config: {},
    past: [],
    future: [],
    maxHistory: 50,
  },
  initial: "ready",
  states: {
    ready: {
      on: {
        SET_VIEW: { actions: ['saveToHistory', 'setView'] },
        SET_DATE: { actions: ['saveToHistory', 'setDate'] },
        CREATE_EVENT: { actions: ['saveToHistory', 'createEvent'] },
        UPDATE_EVENT: { actions: ['saveToHistory', 'updateEvent'] },
        DELETE_EVENT: { actions: ['saveToHistory', 'deleteEvent'] },
        UNDO: {
          guard: ({ context }) => context.past.length > 0,
          actions: ['undo']
        },
        REDO: {
          guard: ({ context }) => context.future.length > 0,
          actions: ['redo']
        },
      }
    }
  },
},
  {
    actions: {
      saveToHistory: assign({
        past: ({ context }) => {
          const newPast = [...context.past, takeSnapshot(context)];
          if (newPast.length > context.maxHistory) {
            newPast.shift();
          }
          return newPast;
        },
        future: () => [],
      }),
      setView: assign({
        view: ({ event }) => (event as { type: "SET_VIEW"; view: SchedulerView }).view
      }),
      setDate: assign({
        date: ({ event }) => (event as { type: "SET_DATE"; date: number }).date
      }),
      createEvent: assign({
        events: ({ context, event }) => {
            const newId = `id_${Date.now()}`;
            const newEvent = { ...(event as { type: "CREATE_EVENT"; event: SchedulerEvent }).event, id: newId };
            return [...context.events, newEvent];
        }
      }),
      updateEvent: assign({
        events: ({ context, event }) =>
          context.events.map(ev =>
            String(ev.id) === String((event as { type: "UPDATE_EVENT"; event: SchedulerEvent }).event.id)
              ? { ...ev, ...(event as { type: "UPDATE_EVENT"; event: SchedulerEvent }).event }
              : ev
          )
      }),
      deleteEvent: assign({
        events: ({ context, event }) =>
          context.events.filter(ev => String(ev.id) !== String((event as { type: "DELETE_EVENT"; id: string | number }).id))
      }),
      undo: assign(({ context }) => {
        const currentState = takeSnapshot(context);
        const previousState = context.past[context.past.length - 1];
        const newPast = context.past.slice(0, -1);
        const newFuture = [currentState, ...context.future];

        return {
          ...previousState,
          past: newPast,
          future: newFuture,
        };
      }),
      redo: assign(({ context }) => {
        const currentState = takeSnapshot(context);
        const nextState = context.future[0];
        const newFuture = context.future.slice(1);
        const newPast = [...context.past, currentState];

        return {
          ...nextState,
          past: newPast,
          future: newFuture,
        };
      })
    }
  }
);
~~~


An dieser Stelle liefert die Maschine:

- Eine einzige Quelle für Scheduler-Eigenschaften
- Snapshot-basierte Undo/Redo (der History enthält Kopien, keine Referenzen)
- Einen einzigen `SET_DATE`-Event — die Navigationslogik (vorherige/nächste/heute) liegt in der Komponente

:::tip
Wenn Sie nur moderne Browser ansteuern, bevorzugt der `deepClone()`-Hilfsfunktion bereits `structuredClone()` und fällt auf JSON-Klonen für ältere Umgebungen zurück.
:::

## Aufbau der Steuerungsleisten-Komponente

Erstellen Sie `src/components/Toolbar.tsx`. Dies ist eine kleine MUI-Toolbar, um:

- die Ansicht zu wechseln (day/week/month)
- vorherige/heute/nächste zu navigieren
- Undo/Redo mit deaktiviertem Zustand, wenn kein Verlauf vorhanden ist

~~~tsx title="src/components/Toolbar.tsx"
import { ButtonGroup, Button, Typography, Stack } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import React from 'react';
import type { SchedulerView } from "../seed/data";

export interface ToolbarProps {
  currentView: SchedulerView;
  currentDate: Date;
  canUndo: boolean;
  canRedo: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onNavigate?: (action: 'prev' | 'next' | 'today') => void;
  setView: (view: SchedulerView) => void;
}

export default React.memo(function Toolbar({ currentView, currentDate, canUndo, canRedo, onUndo, onRedo, onNavigate, setView }: ToolbarProps) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ m: 2 }}>
      <Stack direction="row" gap={1}>
        {(["day", "week", "month"] as const).map(l => (
          <Button key={l} variant={currentView === l ? "contained" : "outlined"} onClick={() => setView(l)}>
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </Button>
        ))}
        <ButtonGroup>
          <Button onClick={() => onUndo?.()} disabled={!canUndo}>
            <UndoIcon />
          </Button>
          <Button onClick={() => onRedo?.()} disabled={!canRedo}>
            <RedoIcon />
          </Button>
        </ButtonGroup>
      </Stack>
      <Typography variant="subtitle1" sx={{ ml: 1 }}>
        {new Date(currentDate)?.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
      </Typography>
      <ButtonGroup>
        <Button onClick={() => onNavigate?.("prev")}>
          &nbsp;&lt;&nbsp;
        </Button>
        <Button onClick={() => onNavigate?.("today")}>
          Today
        </Button>
        <Button onClick={() => onNavigate?.("next")}>
          &nbsp;&gt;&nbsp;
        </Button>
      </ButtonGroup>
    </Stack>
  );
});
~~~

## Scheduler mit XState verbinden

Erstellen Sie `src/components/Scheduler.tsx`. Diese Komponente:

- liest `events/view/date/config` aus dem XState-Maschinenkontext
- stellt einen `data.save`-Callback bereit, der Maschinen-Ereignisse sendet
- verbindet Undo/Redo und Navigation
- versteckt die integrierte Navbar von Scheduler und verwendet stattdessen die benutzerdefinierte Toolbar
- wendet Farbkassen über das `event_class`-Template an

~~~tsx title="src/components/Scheduler.tsx"
import { useCallback, useMemo } from "react";
import { useMachine } from "@xstate/react";
import ReactScheduler from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";
import "./styles.css";
import Toolbar from "./Toolbar";
import { schedulerMachine } from "../machine";
import { type SchedulerView } from "../seed/data";

export default function DemoXStateScheduler() {
  const [state, send] = useMachine(schedulerMachine);

  const canUndo = state.context.past.length > 0;
  const canRedo = state.context.future.length > 0;
  const activeDate = useMemo(() => new Date(state.context.date), [state.context.date]);

  const templates = useMemo(() => ({
    event_class: (_start: Date, _end: Date, event: Record<string, unknown> | null) => {
      if (event == null) {
        return "";
      }
      if (typeof event.classname === "string") {
        return event.classname;
      }
      return "";
    }
  }), []);

  const data = useMemo(() => ({
    save: (entity: string, action: string, payload: Record<string, unknown>, id: string | number) => {
      if (entity !== "event") {
        return;
      }
      switch (action) {
        case "create":
          send({ type: "CREATE_EVENT", event: payload as never });
          break;
        case "update":
          send({ type: "UPDATE_EVENT", event: payload as never });
          break;
        case "delete":
          send({ type: "DELETE_EVENT", id });
          break;
        default:
          console.warn(`Unhandled action: ${action}`);
      }
    }
  }), [send]);

  const handleDateNavigation = useCallback((action: 'prev' | 'next' | 'today') => {
    if (action === 'today') {
      send({ type: "SET_DATE", date: Date.now() })
      return;
    }
    const step = action === 'next' ? 1 : -1;
    const date = new Date(state.context.date);

    if (state.context.view === "day") {
      date.setDate(date.getDate() + step);
    } else if (state.context.view === "week") {
      date.setDate(date.getDate() + step * 7);
    } else {
      date.setMonth(date.getMonth() + step);
    }
    send({ type: "SET_DATE", date: date.getTime() })
  }, [state.context.date, state.context.view, send]);

  const handleUndo = useCallback(() => send({ type: "UNDO" }), [send]);
  const handleRedo = useCallback(() => send({ type: "REDO" }), [send]);
  const handleSetView = useCallback((view: SchedulerView) => send({ type: "SET_VIEW", view: view }), [send]);
  const memoizedXY = useMemo(() => ({ nav_height: 0 }), []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Toolbar
        currentView={state.context.view}
        currentDate={activeDate}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onNavigate={handleDateNavigation}
        setView={handleSetView}
      />
      <ReactScheduler
        events={state.context.events}
        view={state.context.view}
        date={activeDate}
        xy={memoizedXY}
        config={state.context.config}
        data={data}
        templates={templates}
      />
    </div>
  );
}
~~~

Ein paar Details auffällig:

- Der Maschinenkontext ist die einzige Quelle für `events`, `view` und `date`.
- Der `data.save`-Handler wandelt entities-basierte Scheduler-Änderungen in Maschinen-Ereignisse um.
- Wir verstecken die integrierte Scheduler-Navigationsleiste (`xy={{ nav_height: 0 }}`) und ersetzen sie durch unsere eigene Toolbar.
- Das `event_class`-Template liest das Feld `classname` aus jedem Ereignis und wendet es als CSS-Klasse an.

## Event-Farbgestaltungen

Erstellen Sie `src/components/styles.css` mit CSS-Klassen, die den Werten von `classname` in den Seed-Daten entsprechen. Das Template `event_class` wendet diese Klassen auf jedes Ereignis-Element an.

~~~css title="src/components/styles.css"
/*
  Event-Farbgebung.
  Der Scheduler wendet den vom templates.event_class zurückgegebenen Wert auf den Ereigniskontainer an.
  Seed-Daten verwenden `classname`, daher mappen wir sie über das Template und gestalten die Klassen hier.
*/

.blue {
  background: #3b82f6 !important;
  border-color: #2563eb !important;
  color: #ffffff !important;
}

.green {
  background: #22c55e !important;
  border-color: #16a34a !important;
  color: #ffffff !important;
}

.violet {
  background: #a855f7 !important;
  border-color: #9333ea !important;
  color: #ffffff !important;
}

.yellow {
  background: #f59e0b !important;
  border-color: #d97706 !important;
  color: #111827 !important;
}
~~~

## Scheduler in der App integrieren

Passen Sie `src/App.tsx` und `src/App.css` an:

~~~tsx title="src/App.tsx"
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
    return (
      <Scheduler/>
    );
}
export default App;
~~~

~~~css title="src/App.css"
#root, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## Zusammenfassung

Sie haben nun React Scheduler vollständig von XState steuern lassen:

- Scheduler liest `events`, `view`, `date` und `config` aus dem XState-Maschinenkontext
- Benutzerbearbeitungen werden über `data.save` -> Maschinen-Ereignisse für CRUD weitergeleitet
- Die Benutzeroberfläche bleibt synchron, weil Scheduler den aktualisierten Zustand über Props erhält
- Undo/Redo ist via snapshotbasierter Historie mit `guard`-Bedingungen implementiert
- Eine benutzerdefinierte Toolbar ermöglicht View-Wechsel, Datumsnavigation sowie Undo/Redo mit deaktivierten Zuständen

## Was kommt als Nächstes

- Prüfen Sie die Konzepte hinter diesem Beispiel in [Datenbindung & Grundlagen der Zustandsverwaltung](integrations/react/state/state-management-basics.md)
- Erkundigen Sie die Konfigurations- und Vorlagenoptionen von Scheduler in [React Scheduler Überblick](integrations/react/overview.md)
- Fügen Sie Persistenz hinzu (Laden/Speichern von Ereignissen aus einer API), indem asynchrone Ereignisse an die Maschine gesendet werden
- Erforschen Sie dasselbe Muster mit anderen Zustandsmanagern:
  - [React Scheduler mit Redux Toolkit verwenden](integrations/react/state/redux-toolkit.md)
  - [React Scheduler mit MobX verwenden](integrations/react/state/mobx.md)
  - [React Scheduler mit Zustand verwenden](integrations/react/state/zustand.md)
  - [React Scheduler mit Jotai verwenden](integrations/react/state/jotai.md)
  - [React Scheduler mit Valtio verwenden](integrations/react/state/valtio.md)