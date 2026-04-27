---
title: React Scheduler – Jotai Tutorial
sidebar_label: Jotai
description: Lernen Sie, wie Sie den DHTMLX React Scheduler mit Jotai integrieren, einschließlich Ereignis-Erstellen/Aktualisieren/Löschen (CRUD), Synchronisierung von Ansicht/Datum, schreibgeschütkter Konfiguration und Rückgängig/Wiederherstellen.
---

# React Scheduler – Jotai Tutorial

Dieses Tutorial zeigt, wie Sie den **DHTMLX React Scheduler** mit einem **Jotai**-Store verbinden. Sie speichern Ereignisse und UI-Zustände (Ansicht/Datum/Config) in Atomen, leiten Scheduler-Bearbeitungen über `data.save` weiter und fügen **Undo/Redo** mit einer snapshot-basierten Verlaufshistorie hinzu.

:::note
Der vollständige Quellcode ist [auf GitHub](https://github.com/DHTMLX/react-scheduler-jotai-starter) verfügbar.
:::

## Voraussetzungen

- Node.js (LTS empfohlen)
- Grundkenntnisse in React + TypeScript
- Vertrautheit mit Jotai-Atomen und `useAtom`/`useSetAtom`. Falls Sie eine Auffrischung benötigen, siehe die Jotai-Dokumentation: https://jotai.org/

## Schnellstart – Projekt erstellen

Erstellen Sie ein Vite + React + TypeScript-Projekt:

~~~bash
npm create vite@latest scheduler-jotai-demo -- --template react-ts
cd scheduler-jotai-demo
npm install
~~~

Installieren Sie Jotai:

~~~bash
npm install jotai
~~~

Installieren Sie Material UI (für die Demo-Toolbar verwendet):

~~~bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

### Installation des React Scheduler

Installieren Sie React Scheduler wie im [Installationsleitfaden des React Scheduler](integrations/react/installation.md) beschrieben.

In diesem Tutorial verwenden wir das Evaluierungspaket:

```bash
npm install @dhtmlx/trial-react-scheduler
```

oder

```bash
yarn add @dhtmlx/trial-react-scheduler
```

Wenn Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-react-scheduler` durch `@dhx/react-scheduler` in den Befehlen und Importen.

Führen Sie den Entwicklungsserver aus:

~~~bash
npm run dev
~~~

:::note
Um Scheduler die gesamte Seite auszufüllen, entfernen Sie die Standard-Stile aus `src/App.css` und fügen Sie Folgendes hinzu:

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

## Gemeinsame Typen definieren

Erstellen Sie `src/types.ts`. Diese Typen werden von Atomen und Komponenten gemeinsam genutzt:

~~~ts
export type SchedulerView = "day" | "week" | "month";
export type SchedulerEventId = string | number;

export interface SchedulerEvent {
  id: SchedulerEventId;
  start_date: string;
  end_date: string;
  text: string;

  // Scheduler kann zur Laufzeit zusätzliche Felder anhängen (z.B. benutzerdefinierte Props). Halten Sie das Demo-Beispiel permissiv.
  [key: string]: unknown;
}

export type SchedulerConfig = Record<string, unknown>;

export interface SchedulerSnapshot {
  events: SchedulerEvent[];
  config: SchedulerConfig;
}
~~~

- `SchedulerEvent` verwendet eine Index-Signatur, damit Scheduler zur Laufzeit zusätzliche Felder anhängen kann.
- `SchedulerSnapshot` erfasst die Daten, die für Undo/Redo benötigt werden (Ereignisse + Konfiguration).

## Beispiel-Daten einrichten

Erstellen Sie `src/seed/data.ts` mit einigen Ereignissen und initialem UI-Zustand. Beachten Sie, dass `seedDate` als **Zahl** (Zeitstempel) gespeichert wird, damit der Zustand der Atome serialisierbar bleibt.

~~~ts
import type { SchedulerEvent, SchedulerView } from "../types";

export const seedEvents: SchedulerEvent[] = [
  { id: 1, start_date: "2025-08-11T02:00:00Z", end_date: "2025-08-11T10:20:00Z", text: "Product Strategy Hike" },
  { id: 2, start_date: "2025-08-12T06:00:00Z", end_date: "2025-08-12T11:00:00Z", text: "Tranquil Tea Time" },
  { id: 3, start_date: "2025-08-15T03:00:00Z", end_date: "2025-08-15T08:00:00Z", text: "Demo and Showcase" },
];

export const seedDate = Date.parse("2025-08-15T00:00:00Z");
export const seedView: SchedulerView = "week";
~~~

:::note
Die begleitende Demo enthält zusätzliche Ereignisse für eine reichhaltigere visuelle Darstellung.
:::

## Jotai-Atome und Aktionen erstellen

Erstellen Sie `src/schedulerAtoms.ts`. Dieses Setup speichert:

- `events` (Scheduler-Daten)
- `currentDate` (Zeitstempel)
- `view` (`day | week | month`)
- `config` (Scheduler-Konfigurationsobjekt, einschließlich `readonly`)
- `past` / `future` Snapshots für Undo/Redo

In diesem Beispiel verfolgt Undo/Redo nur **Ereignis- und Konfig-Änderungen**. Datumnavigation und View-Switching werden nicht zur Historie hinzugefügt.

~~~ts
import { atom } from "jotai";
import { seedDate, seedEvents, seedView } from "./seed/data";
import type {
  SchedulerConfig,
  SchedulerEvent,
  SchedulerEventId,
  SchedulerSnapshot,
  SchedulerView,
} from "./types";

interface SchedulerState {
  events: SchedulerEvent[];
  currentDate: number;
  view: SchedulerView;
  config: SchedulerConfig;
}

export type SchedulerAction =
  | {
      type: "updateEvent";
      payload: Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">;
    }
  | {
      type: "createEvent";
      payload: Omit<SchedulerEvent, "id"> & Partial<Pick<SchedulerEvent, "id">>;
    }
  | { type: "deleteEvent"; payload: SchedulerEventId }
  | { type: "setCurrentDate"; payload: number }
  | { type: "setView"; payload: SchedulerView }
  | { type: "updateConfig"; payload: Partial<SchedulerConfig> }
  | { type: "undo" }
  | { type: "redo" };

const schedulerStateAtom = atom<SchedulerState>({
  events: seedEvents as unknown as SchedulerEvent[],
  currentDate: seedDate,
  view: seedView,
  config: {},
});

const pastAtom = atom<SchedulerSnapshot[]>([]);
const futureAtom = atom<SchedulerSnapshot[]>([]);
const MAX_HISTORY_SIZE = 50;

const deepCopy = <T,>(value: T): T => {
  return JSON.parse(JSON.stringify(value)) as T;
};

const createSnapshot = (state: SchedulerState): SchedulerSnapshot => ({
  events: deepCopy(state.events),
  config: deepCopy(state.config),
});

export const schedulerActionsAtom = atom(
  null,
  (get, set, action: SchedulerAction): SchedulerEvent | void => {
    const currentState = get(schedulerStateAtom);
    const past = get(pastAtom);
    const future = get(futureAtom);

    const pushHistory = () => {
      set(pastAtom, [...past.slice(-MAX_HISTORY_SIZE + 1), createSnapshot(currentState)]);
      set(futureAtom, []);
    };

    if (action.type === "setCurrentDate") {
      set(schedulerStateAtom, { ...currentState, currentDate: action.payload });
      return;
    }

    if (action.type === "setView") {
      set(schedulerStateAtom, { ...currentState, view: action.payload });
      return;
    }

    if (action.type === "createEvent") {
      pushHistory();
      const id = action.payload.id != null ? action.payload.id : `id_${Date.now().toString()}`;
      const newEvent: SchedulerEvent = { ...action.payload, id } as SchedulerEvent;

      set(schedulerStateAtom, {
        ...currentState,
        events: [...currentState.events, newEvent],
      });
      return newEvent;
    }

    if (action.type === "updateEvent") {
      const index = currentState.events.findIndex((event) => String(event.id) === String(action.payload.id));
      if (index === -1) return;

      pushHistory();
      set(schedulerStateAtom, {
        ...currentState,
        events: [
          ...currentState.events.slice(0, index),
          { ...currentState.events[index], ...action.payload },
          ...currentState.events.slice(index + 1),
        ],
      });
      return;
    }

    if (action.type === "deleteEvent") {
      const exists = currentState.events.some((event) => String(event.id) === String(action.payload));
      if (!exists) return;

      pushHistory();
      set(schedulerStateAtom, {
        ...currentState,
        events: currentState.events.filter((event) => String(event.id) !== String(action.payload)),
      });
      return;
    }

    if (action.type === "updateConfig") {
      pushHistory();
      set(schedulerStateAtom, {
        ...currentState,
        config: { ...currentState.config, ...action.payload },
      });
      return;
    }

    if (action.type === "undo") {
      if (past.length === 0) return;

      const previous = past[past.length - 1];
      set(pastAtom, past.slice(0, -1));
      set(futureAtom, [createSnapshot(currentState), ...future]);
      set(schedulerStateAtom, {
        ...currentState,
        events: previous.events,
        config: previous.config,
      });
      return;
    }

    if (action.type === "redo") {
      if (future.length === 0) return;

      const next = future[0];
      set(futureAtom, future.slice(1));
      set(pastAtom, [...past, createSnapshot(currentState)]);
      set(schedulerStateAtom, {
        ...currentState,
        events: next.events,
        config: next.config,
      });
    }
  }
);

export const schedulerStateViewAtom = atom((get) => get(schedulerStateAtom));
export const canUndoAtom = atom((get) => get(pastAtom).length > 0);
export const canRedoAtom = atom((get) => get(futureAtom).length > 0);
~~~

## Die Steuerleiste bauen

Erstellen Sie `src/components/Toolbar.tsx`. Diese Toolbar wird:

- den View wechseln (Tag/Woche/Monat)
- vorherige/aktuell/naechste navigieren
- Undo/Redo mit deaktivierten Zuständen
- den Read-Only-Modus umschalten

~~~tsx
import { ButtonGroup, Button, Typography, Stack, FormControlLabel, Switch } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import React from "react";
import type { SchedulerView } from "../types";

export interface ToolbarProps {
  currentView: SchedulerView;
  currentDate: Date;
  isReadOnly: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onNavigate?: (action: "prev" | "next" | "today") => void;
  onReadOnlyChange?: (value: boolean) => void;
  setView: (view: SchedulerView) => void;
}

export default React.memo(function Toolbar({
  currentView,
  currentDate,
  isReadOnly,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onNavigate,
  onReadOnlyChange,
  setView,
}: ToolbarProps) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ m: 2 }}>
      <Stack direction="row" gap={1}>
        {(["day", "week", "month"] as const).map((label) => (
          <Button key={label} variant={currentView === label ? "contained" : "outlined"} onClick={() => setView(label)}>
            {label.charAt(0).toUpperCase() + label.slice(1)}
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

        <FormControlLabel
          label="Read-only"
          control={
            <Switch
              checked={isReadOnly}
              onChange={(event) => onReadOnlyChange?.(event.target.checked)}
              inputProps={{ "aria-label": "Toggle read-only" }}
            />
          }
        />
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

## Scheduler mit Jotai verbinden

Erstellen Sie `src/components/Scheduler.tsx`. Diese Komponente:

- liest `events/view/currentDate/config` aus Atomen
- verbindet Scheduler CRUD (`create/update/delete`) über `data.save`
- verknüpft Undo/Redo, Navigation und Read-Only-Umschaltung
- versteckt die integrierte Scheduler-Navigationsleiste und verwendet die benutzerdefinierte Toolbar

~~~tsx
import { useCallback, useMemo } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import ReactScheduler from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

import Toolbar from "./Toolbar";
import {
  canRedoAtom,
  canUndoAtom,
  schedulerActionsAtom,
  schedulerStateViewAtom,
} from "../schedulerAtoms";
import type { SchedulerEvent, SchedulerEventId, SchedulerView } from "../types";

type SaveAction = "create" | "update" | "delete";
type SaveEntity = "event";

export default function DemoJotaiScheduler() {
  const state = useAtomValue(schedulerStateViewAtom);
  const dispatchAction = useSetAtom(schedulerActionsAtom);
  const canUndo = useAtomValue(canUndoAtom);
  const canRedo = useAtomValue(canRedoAtom);

  const { events, view, currentDate, config } = state;
  const activeDate = useMemo(() => new Date(currentDate), [currentDate]);
  const isReadOnly = Boolean((config as { readonly?: unknown }).readonly);

  const setCurrentDate = useCallback(
    (dateMs: number) => dispatchAction({ type: "setCurrentDate", payload: dateMs }),
    [dispatchAction]
  );
  const setView = useCallback(
    (nextView: SchedulerView) => dispatchAction({ type: "setView", payload: nextView }),
    [dispatchAction]
  );
  const undo = useCallback(() => dispatchAction({ type: "undo" }), [dispatchAction]);
  const redo = useCallback(() => dispatchAction({ type: "redo" }), [dispatchAction]);
  const updateReadOnly = useCallback(
    (value: boolean) => dispatchAction({ type: "updateConfig", payload: { readonly: value } }),
    [dispatchAction]
  );

  const handleDateNavigation = useCallback(
    (action: "prev" | "next" | "today") => {
      if (action === "today") {
        setCurrentDate(Date.now());
        return;
      }

      const step = action === "next" ? 1 : -1;
      const date = new Date(currentDate);

      if (view === "day") {
        date.setDate(date.getDate() + step);
      } else if (view === "week") {
        date.setDate(date.getDate() + step * 7);
      } else {
        date.setMonth(date.getMonth() + step);
      }

      setCurrentDate(date.getTime());
    },
    [currentDate, view, setCurrentDate]
  );

  const handleViewChange = useCallback(
    (mode: string, date: Date) => {
      const nextView: SchedulerView = mode === "day" || mode === "week" || mode === "month" ? mode : "month";
      setView(nextView);
      setCurrentDate(date.getTime());
    },
    [setView, setCurrentDate]
  );

  // Scheduler <-> Jotai data bridge
  const dataBridge = useMemo(
    () => ({
      save: (entity: SaveEntity, action: SaveAction, payload: unknown, id: unknown) => {
        if (entity !== "event") return;

        switch (action) {
          case "update": {
            const eventData =
              payload && typeof payload === "object" ? (payload as Partial<SchedulerEvent>) : ({} as Partial<SchedulerEvent>);
            const eventId = eventData.id ?? id;
            if (eventId == null) {
              console.warn("Update called without an id", { payload, id });
              return;
            }

            const updatedEvent = { ...eventData, id: eventId } as Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">;
            dispatchAction({ type: "updateEvent", payload: updatedEvent });
            return updatedEvent;
          }
          case "create": {
            const eventData =
              payload && typeof payload === "object"
                ? (payload as Omit<SchedulerEvent, "id"> & Partial<Pick<SchedulerEvent, "id">>)
                : null;
            if (!eventData) {
              console.warn("Create called without event payload", { payload });
              return;
            }
            return dispatchAction({ type: "createEvent", payload: eventData });
          }
          case "delete": {
            const deleteId =
              payload && typeof payload === "object"
                ? ((payload as { id?: unknown }).id ?? id)
                : payload ?? id;

            if (deleteId == null) {
              console.warn("Delete called without an id", { payload, id });
              return;
            }

            dispatchAction({ type: "deleteEvent", payload: deleteId as SchedulerEventId });
            return deleteId;
          }
          default:
            console.warn(`Unknown action: ${action}`);
            return;
        }
      },
    }),
    [dispatchAction]
  );

  const memoizedXY = useMemo(() => ({ nav_height: 0 }), []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Toolbar
        currentView={view}
        currentDate={activeDate}
        isReadOnly={isReadOnly}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        onNavigate={handleDateNavigation}
        onReadOnlyChange={updateReadOnly}
        setView={setView}
      />

      <ReactScheduler
        events={events}
        view={view}
        date={activeDate}
        xy={memoizedXY}
        config={config}
        data={dataBridge}
        onViewChange={handleViewChange}
      />
    </div>
  );
}
~~~

## Scheduler in der App rendern

Aktualisieren Sie `src/App.tsx`:

~~~tsx
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
  return <Scheduler />;
}

export default App;
~~~

## Zusammenfassung

Sie haben jetzt den React Scheduler vollständig über Jotai gesteuert:

- Jotai-Atome halten `events`, `view`, `currentDate` und `config` als einzige Wahrheitsquelle
- Scheduler-Bearbeitungen werden durch `data.save` an typisierte Jotai-Aktionen weitergeleitet
- Undo/Redo ist mit einer snapshot-basierten Verlaufshistorie für Ereignis-/Konfig-Änderungen implementiert
- ein Read-Only-Konfigurationsschalter sperrt Scheduler vor Bearbeitungen
- eine benutzerdefinierte Toolbar kümmert sich um Navigation, View-Wechsel und History-Kontrollen

## Ausblick

- Überdenken Sie die Konzepte hinter diesem Beispiel in [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)
- Erkunden Sie Scheduler-Konfiguration und Template-Optionen in [React Scheduler overview](integrations/react/overview.md)
- Persistenz hinzufügen, indem Ereignisse von einer API geladen/gespeichert werden und Atom-Aktionen dispatcht werden
- Dasselbe Muster mit anderen State-Manager-Optionen erkunden:
  - [Using React Scheduler with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Scheduler with MobX](integrations/react/state/mobx.md)
  - [Using React Scheduler with XState](integrations/react/state/xstate.md)
  - [Using React Scheduler with Zustand](integrations/react/state/zustand.md)
  - [Using React Scheduler with Valtio](integrations/react/state/valtio.md)