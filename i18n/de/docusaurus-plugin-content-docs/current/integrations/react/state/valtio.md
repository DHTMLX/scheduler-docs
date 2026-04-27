---
sidebar_label: Valtio
title: React Scheduler mit Valtio
description: Verwalten Sie den Zustand des React Scheduler mit einem Valtio-Proxy-Speicher, wenden Sie Benutzerbearbeitungen über data.save an und fügen Sie eine snapshotbasierte Undo/Redo-Funktion hinzu.
---

# React Scheduler - Valtio Tutorial

Dieses Tutorial zeigt, wie man **React Scheduler** in einer Vite + React + TypeScript-Anwendung rendert und seinen Zustand mit **Valtio** verwaltet. Sie speichern Ereignisse, das aktuelle Datum und die aktive Ansicht in einem Valtio-Proxy-Speicher und leiten dann Benutzerbearbeitungen über den Callback `data.save` des Schedulers weiter.

Am Ende verfügen Sie über einen Scheduler mit:

- einer wiederverwendbaren Symbolleiste (Ansicht-Wechsler, Datumsnavigation, Rückgängig/Wiederherstellen, Read-only-Umschalter)
- speichergetriebenem CRUD für Ereignisse (Erstellen/Aktualisieren/Löschen)
- snapshotbasierte Undo/Redo (Ereignisse + Konfiguration)

:::note
Der vollständige Quellcode ist [auf GitHub verfügbar](https://github.com/nicetip/react-scheduler-valtio-starter).
:::

## Voraussetzungen

- Grundlagen zu React + TypeScript
- Grundkenntnisse von Vite
- Grundkenntnisse von Valtio
- Empfohlen: Informationen zur React Scheduler-Datenbindung und `data.save` in [React Scheduler-Dokumentation: Datenbindung](integrations/react/state/state-management-basics.md)

## Ein Projekt erstellen

Erstellen Sie ein Vite + React + TypeScript-Projekt:

~~~bash
npm create vite@latest scheduler-valtio-demo -- --template react-ts
cd scheduler-valtio-demo
~~~

## Abhängigkeiten installieren

In diesem Tutorial werden folgende Pakete verwendet:

- **Valtio** für das State-Management
- **Material UI** für die Toolbar-Benutzeroberfläche

Installieren Sie die Pakete:

~~~bash
npm install valtio @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

Wenn Sie Yarn verwenden:

~~~bash
yarn add valtio @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

## Installing React Scheduler

Installieren Sie React Scheduler wie in der [Installationsanleitung für React Scheduler](integrations/react/installation.md).

In diesem Tutorial verwenden wir das Evaluationspaket:

```bash
npm install @dhtmlx/trial-react-scheduler
```

oder

```bash
yarn add @dhtmlx/trial-react-scheduler
```

Wenn Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-react-scheduler` durch `@dhx/react-scheduler` in den Befehlen und Importen.

## Vorbereitung der App-Stile

React Scheduler erwartet einen übergeordneten Container mit fester Höhe. Ersetzen Sie die Standardstile in `src/App.css` durch:

~~~css title="src/App.css"
#root {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## Seed-Daten hinzufügen

Erstellen Sie `src/seed/data.ts` mit einem kleinen Datensatz und Standardansicht/-datum:

~~~ts title="src/seed/data.ts"
export const seedEvents = [
  {
    id: 1,
    start_date: "2025-08-11T02:00:00Z",
    end_date: "2025-08-11T10:20:00Z",
    text: "Product Strategy Hike",
  },
  {
    id: 2,
    start_date: "2025-08-12T06:00:00Z",
    end_date: "2025-08-12T11:00:00Z",
    text: "Tranquil Tea Time",
  },
  {
    id: 3,
    start_date: "2025-08-15T03:00:00Z",
    end_date: "2025-08-15T08:00:00Z",
    text: "Demo and Showcase",
  },
  {
    id: 4,
    start_date: "2025-08-12T11:30:00Z",
    end_date: "2025-08-12T19:00:00Z",
    text: "Sprint Review and Retreat",
  },
];

export const seedDate = Date.parse("2025-08-15T00:00:00Z");

export type SchedulerView = "day" | "week" | "month";
export const seedView: SchedulerView = "week";
~~~

:::note
Die Begleit-Demo enthält zusätzliche Ereignisse für eine reichhaltigere Visualisierung.
:::

## Einen Valtio-Speicher erstellen

Erstellen Sie `src/store.ts`. Dieser Speicher besitzt:

- `events` (das Ereignis-Array, das dem Scheduler übergeben wird)
- `currentDate` und `view` (ebenfalls als Props)
- `config` (Scheduler-Konfigurationsobjekt, einschließlich `readonly`)
- `_past` / `_future`-Stacks für Undo/Redo-Verlauf

Der zentrale Aspekt ist der **snapshot-basierte Verlauf**: Wir speichern tief geklonte Schnappschüsse, damit Undo/Redo keine Referenzen auf mutable Arrays behält. Navigation (`setCurrentDate`/`setView`) ist absichtlich **nicht rückgängig machbar** — nur datenändernde Aktionen (CRUD, Konfigurationsänderungen) drücken in den Verlaufstack.

~~~ts title="src/store.ts"
import { proxy, snapshot } from "valtio";
import { seedEvents, seedView, seedDate, type SchedulerView } from "./seed/data";

export type SchedulerEvent = {
  id: string | number;
  start_date: string;
  end_date: string;
  text: string;
  [key: string]: unknown;
};

export type SchedulerConfig = Record<string, unknown>;

type HistorySnapshot = {
  events: SchedulerEvent[];
  config: SchedulerConfig;
};

const deepClone = <T,>(value: T): T => {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value)) as T;
};

const normalizeId = (value: unknown) => String(value);

export const createSchedulerStore = () => {
  const state = proxy({
    events: seedEvents as SchedulerEvent[],
    currentDate: seedDate as number,
    view: seedView as SchedulerView,
    config: {} as SchedulerConfig,

    // Undo/redo history stacks and capacity
    _past: [] as HistorySnapshot[],
    _future: [] as HistorySnapshot[],
    _cap: 50,
  });

  const getHistorySnapshot = (): HistorySnapshot => {
    const snap = snapshot(state);

    return {
      events: deepClone(snap.events as SchedulerEvent[]),
      config: deepClone(snap.config as SchedulerConfig),
    };
  };

  const recordHistory = () => {
    const snapshotItem = getHistorySnapshot();

    state._past = [...state._past.slice(-state._cap + 1), snapshotItem];
    state._future = [];
  };

  const actions = {
    updateEvent: (payload: Partial<SchedulerEvent> & { id?: string | number }) => {
      const payloadId = payload.id;

      if (payloadId === undefined || payloadId === null) {
        return;
      }

      recordHistory();
      const normalizedPayloadId = normalizeId(payloadId);

      state.events = state.events.map((eventItem) => {
        if (normalizeId(eventItem.id) !== normalizedPayloadId) {
          return eventItem;
        }

        return { ...eventItem, ...payload, id: eventItem.id };
      });
    },

    createEvent: (payload: Partial<SchedulerEvent>) => {
      recordHistory();

      const newEventId = `id_${Date.now().toString()}`;
      const newEvent = { ...payload, id: newEventId } as SchedulerEvent;

      state.events = [...state.events, newEvent];
      return newEvent;
    },

    deleteEvent: (id: string | number) => {
      recordHistory();
      const normalizedId = normalizeId(id);

      state.events = state.events.filter((eventItem) => {
        return normalizeId(eventItem.id) !== normalizedId;
      });
    },

    // Navigation is not an undoable user action in this demo.
    setCurrentDate: (date: number) => {
      state.currentDate = date;
    },

    // Navigation is not an undoable user action in this demo.
    setView: (view: SchedulerView) => {
      state.view = view;
    },

    updateConfig: (partial: Partial<SchedulerConfig>) => {
      recordHistory();
      state.config = { ...state.config, ...partial };
    },

    undo: () => {
      if (state._past.length === 0) return;

      const previous = state._past[state._past.length - 1];
      const current = getHistorySnapshot();

      state._past = state._past.slice(0, -1);
      state._future = [current, ...state._future];

      state.events = previous.events;
      state.config = previous.config;
    },

    redo: () => {
      if (state._future.length === 0) return;

      const next = state._future[0];
      const current = getHistorySnapshot();

      state._future = state._future.slice(1);
      state._past = [...state._past.slice(-state._cap + 1), current];

      state.events = next.events;
      state.config = next.config;
    },
  };

  return { state, actions };
};

export const schedulerStore = createSchedulerStore();
export default schedulerStore;
~~~

## Eine wiederverwendbare Toolbar erstellen

Erstellen Sie `src/components/Toolbar.tsx`. Dies ist eine kleine MUI-Toolbar, die Folgendes ermöglicht:

- Ansicht wechseln (day/week/month)
- vorherige/heute/nächste Navigation
- undo/redo
- Read-only-Modus umschalten

~~~tsx title="src/components/Toolbar.tsx"
import { ButtonGroup, Button, Typography, Stack, FormControlLabel, Switch } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import React from "react";

import type { SchedulerView } from "../seed/data";

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
        {(["day", "week", "month"] as const).map((l) => (
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

        <FormControlLabel
          label="Read-only"
          control={
            <Switch
              checked={isReadOnly}
              onChange={(e) => onReadOnlyChange?.(e.target.checked)}
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
          Heute
        </Button>
        <Button onClick={() => onNavigate?.("next")}>
          &nbsp;&gt;&nbsp;
        </Button>
      </ButtonGroup>
    </Stack>
  );
});
~~~

## React Scheduler rendern und mit Valtio verbinden

Erstellen Sie `src/components/Scheduler.tsx`. Diese Komponente:

- abonniert den Valtio-Proxy über `useSnapshot`
- übergibt `events`, `date`, `view` und `config` als Props an React Scheduler
- implementiert `data.save` mit einer Bridge via `switch/case`, die Änderungen in Store-Aktionen weiterleitet
- verbindet Undo/Redo und den `read-only`-Konfigurations-Toggle
- versteckt die integrierte Navbar und verwendet stattdessen die benutzerdefinierte Toolbar

~~~tsx title="src/components/Scheduler.tsx"
import { useCallback, useMemo } from "react";

// Trial-import:
import ReactScheduler from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

// Pro-import:
// import ReactScheduler from "@dhx/react-scheduler";
// import "@dhx/react-scheduler/dist/react-scheduler.css";

import { useSnapshot } from "valtio";

import Toolbar from "./Toolbar";
import schedulerStore from "../store";
import type { SchedulerEvent } from "../store";
import type { SchedulerView } from "../seed/data";

export default function DemoValtioScheduler() {
  const snap = useSnapshot(schedulerStore.state);

  const canUndo = snap._past.length > 0;
  const canRedo = snap._future.length > 0;
  const isReadOnly = Boolean((snap.config as { readonly?: unknown }).readonly);

  const activeDate = useMemo(() => {
    return new Date(snap.currentDate);
  }, [snap.currentDate]);

  const handleSetCurrentDate = useCallback((date: number) => {
    schedulerStore.actions.setCurrentDate(date);
  }, []);

  const handleSetView = useCallback((view: SchedulerView) => {
    schedulerStore.actions.setView(view);
  }, []);

  const handleUndo = useCallback(() => {
    schedulerStore.actions.undo();
  }, []);

  const handleRedo = useCallback(() => {
    schedulerStore.actions.redo();
  }, []);

  const handleReadOnlyChange = useCallback((value: boolean) => {
    schedulerStore.actions.updateConfig({ readonly: value });
  }, []);

  const handleDateNavigation = useCallback(
    (action: "prev" | "next" | "today") => {
      if (action === "today") {
        handleSetCurrentDate(Date.now());
        return;
      }

      const step = action === "next" ? 1 : -1;
      const date = new Date(snap.currentDate);

      if (snap.view === "day") {
        date.setDate(date.getDate() + step);
      } else if (snap.view === "week") {
        date.setDate(date.getDate() + step * 7);
      } else {
        date.setMonth(date.getMonth() + step);
      }

      handleSetCurrentDate(date.getTime());
    },
    [handleSetCurrentDate, snap.currentDate, snap.view]
  );

  // Scheduler <-> Valtio Data Bridge
  const dataBridge = useMemo(() => {
    return {
      save: (entity: string, action: string, payload: unknown, id: unknown) => {
        if (entity !== "event") return;

        switch (action) {
          case "update": {
            const eventData = payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {};
            const eventId = (eventData as Record<string, unknown>).id ?? id;
            if (eventId == null) {
              console.warn("Update called without an id", { payload, id });
              return;
            }

            const eventWithId = { ...eventData, id: eventId } as Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">;
            return schedulerStore.actions.updateEvent(eventWithId);
          }
          case "create":
            return schedulerStore.actions.createEvent(payload as Omit<Partial<SchedulerEvent>, "id">);
          case "delete": {
            const deleteId =
              payload && typeof payload === "object"
                ? (payload as Record<string, unknown>).id ?? id
                : payload ?? id;
            if (deleteId == null) {
              console.warn("Delete called without an id", { payload, id });
              return;
            }
            return schedulerStore.actions.deleteEvent(deleteId as SchedulerEvent["id"]);
          }
          default:
            console.warn(`Unknown action: ${action}`);
            return;
        }
      },
    };
  }, []);

  const handleViewChange = useCallback(
    (mode: string, date: Date) => {
      const nextView: SchedulerView = mode === "day" || mode === "week" || mode === "month" ? mode : "month";
      schedulerStore.actions.setView(nextView);
      schedulerStore.actions.setCurrentDate(date.getTime());
    },
    []
  );

  const memoizedXY = useMemo(() => ({ nav_height: 0 }), []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Toolbar
        currentView={snap.view}
        currentDate={activeDate}
        isReadOnly={isReadOnly}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onNavigate={handleDateNavigation}
        onReadOnlyChange={handleReadOnlyChange}
        setView={handleSetView}
      />

      <ReactScheduler
        events={snap.events}
        view={snap.view}
        date={activeDate}
        xy={memoizedXY} /* verstecke integrierte Navbar */
        config={snap.config}
        data={dataBridge}
        onViewChange={handleViewChange}
      />
    </div>
  );
}
~~~

## Den Scheduler mounten

Aktualisieren Sie `src/App.tsx`:

~~~tsx title="src/App.tsx"
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
  return <Scheduler />;
}

export default App;
~~~

## Die Anwendung ausführen

Starten Sie den Entwicklungsserver:

~~~bash
npm run dev
~~~

oder:

~~~bash
yarn dev
~~~

## Zusammenfassung

In diesem Tutorial haben Sie:

- ein Vite + React-Projekt erstellt
- React Scheduler mit einem deterministischen Container in voller Höhe gerendert
- `events`, `view`, `currentDate` und `config` in einem einzigen Valtio-Proxy-Speicher modelliert
- snapshotbasierte Undo/Redo mit `_past`/`_future`-Stacks (Ereignisse + Konfiguration) implementiert
- alle Scheduler-Änderungen über `data.save` in Store-Aktionen weitergeleitet
- einen Read-only-Toggle hinzugefügt, der den Scheduler vor Bearbeitungen sperrt

Dies hält die Scheduler-Komponente deklarativ (State -> Props), während der Store die gesamte Mutationslogik und die Historie besitzt.

## Was als Nächstes

- Erkunden Sie die beiden unterstützten Datenbindungsmodelle in [React Scheduler-Dokumentation: Datenbindung](integrations/react/state/state-management-basics.md)
- Fügen Sie benutzerdefinierte Vorlagen und UI über die `templates`-Eigenschaft hinzu
- Erforschen Sie dasselbe Muster mit anderen State-Managern:
  - [React Scheduler mit Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [React Scheduler mit MobX](integrations/react/state/mobx.md)
  - [React Scheduler mit XState](integrations/react/state/xstate.md)
  - [React Scheduler mit Zustand](integrations/react/state/zustand.md)
  - [React Scheduler mit Jotai](integrations/react/state/jotai.md)