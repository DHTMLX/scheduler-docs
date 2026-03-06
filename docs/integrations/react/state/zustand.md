---
title: React Scheduler - Zustand Tutorial
sidebar_label: Zustand
description: Learn how to integrate DHTMLX React Scheduler with Zustand, including event CRUD, view/date sync, and undo/redo.
---

# React Scheduler - Zustand Tutorial

This tutorial shows how to connect **DHTMLX React Scheduler** to a **Zustand** store. You will keep events and UI state (view/date/config) in Zustand, route Scheduler edits through `data.save`, and add **undo/redo** with snapshot-based history.

:::note
The complete source code is [available on GitHub](https://github.com/DHTMLX/react-scheduler-zustand-starter).
:::

## Prerequisites

- Node.js (LTS recommended)
- React + TypeScript basics
- Familiarity with Zustand hooks and selectors. If you need a refresher, see the Zustand docs: https://zustand.docs.pmnd.rs/

## Quick setup - create the project

Create a Vite + React + TS project:

~~~bash
npm create vite@latest scheduler-zustand-demo -- --template react-ts
cd scheduler-zustand-demo
npm install
~~~

Install Zustand:

~~~bash
npm install zustand
~~~

Install Material UI (used for the demo toolbar):

~~~bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

### Installing React Scheduler

Install React Scheduler as described in the [React Scheduler installation guide](integrations/react/installation.md).

In this tutorial we use the evaluation package:

```bash
npm install @dhtmlx/trial-react-scheduler
```

or

```bash
yarn add @dhtmlx/trial-react-scheduler
```

If you already use the Professional package, replace `@dhtmlx/trial-react-scheduler` with `@dhx/react-scheduler` in the commands and imports.

Run the dev server:

~~~bash
npm run dev
~~~

:::note
To make Scheduler occupy the whole page, remove the default styles from `src/App.css` and add:

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

## Define shared types

Create `src/types.ts`. These types are shared across the store and components:

~~~ts
export type SchedulerView = "day" | "week" | "month";

export interface SchedulerEvent {
  id: string | number;
  start_date: string;
  end_date: string;
  text: string;

  // Scheduler may attach extra fields (e.g. custom props). Keep the demo permissive.
  [key: string]: unknown;
}

export type SchedulerConfig = Record<string, unknown>;

export interface SchedulerSnapshot {
  events: SchedulerEvent[];
}
~~~

- `SchedulerEvent` uses an index signature so Scheduler can attach extra fields at runtime.
- `SchedulerSnapshot` captures the data needed for undo/redo (events).

## Setting up sample data

Create `src/seed/data.ts` with a few events and initial UI state. Notice that `currentDate` is stored as a **number** (timestamp) so the store state stays serializable.

~~~ts
export const seedEvents = [
  { id: 1, start_date: "2025-08-11T02:00:00Z", end_date: "2025-08-11T10:20:00Z", text: "Product Strategy Hike" },
  { id: 2, start_date: "2025-08-12T06:00:00Z", end_date: "2025-08-12T11:00:00Z", text: "Tranquil Tea Time" },
  { id: 3, start_date: "2025-08-15T03:00:00Z", end_date: "2025-08-15T08:00:00Z", text: "Demo and Showcase" },
];

export const seedDate = Date.parse("2025-08-15T00:00:00Z");
export const seedView = "week";
~~~

:::note
The companion demo includes additional events for a richer visual.
:::

## Create the Zustand store

Create `src/store.ts`. This store holds:

- `events` (Scheduler data)
- `currentDate` (as timestamp)
- `view` (`day | week | month`)
- `config` (Scheduler configuration object)
- `past` / `future` (snapshot arrays for undo/redo)

Undo/redo is integrated directly into the store using snapshots. Before every data-modifying action, `pushHistory` saves a snapshot of the current events. The `undo` and `redo` actions swap the current state with a snapshot from the history.

~~~ts
import { create } from "zustand";

import { seedDate, seedEvents, seedView } from "./seed/data";
import type { SchedulerConfig, SchedulerEvent, SchedulerSnapshot, SchedulerView } from "./types";

export interface SchedulerStoreState {
  events: SchedulerEvent[];
  currentDate: number;
  view: SchedulerView;
  config: SchedulerConfig;

  past: SchedulerSnapshot[];
  future: SchedulerSnapshot[];
  maxHistory: number;

  setCurrentDate: (date: number) => void;
  setView: (view: SchedulerView) => void;

  createEvent: (event: Omit<SchedulerEvent, "id"> & Partial<Pick<SchedulerEvent, "id">>) => SchedulerEvent;
  updateEvent: (event: Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">) => void;
  deleteEvent: (id: SchedulerEvent["id"]) => void;

  undo: () => void;
  redo: () => void;
}

const deepCopy = <T,>(value: T): T => {
  return JSON.parse(JSON.stringify(value)) as T;
};

const createSnapshot = (events: SchedulerEvent[]): SchedulerSnapshot => ({
  events: deepCopy(events),
});

// Simulate receiving an ID from a backend.
const generateId = () => `id_${Date.now().toString()}`;

export const useSchedulerStore = create<SchedulerStoreState>((set, get) => {
  const pushHistory = () => {
    const { events, past, maxHistory } = get();
    const snapshot = createSnapshot(events);

    set({
      past: [...past.slice(-maxHistory + 1), snapshot],
      future: [],
    });
  };

  return {
    events: seedEvents as unknown as SchedulerEvent[],
    currentDate: seedDate,
    view: seedView as SchedulerView,
    config: {},

    past: [],
    future: [],
    maxHistory: 50,

    setCurrentDate: (date) => set({ currentDate: date }),
    setView: (view) => set({ view }),

    createEvent: (event) => {
      pushHistory();

      const id = event.id != null ? event.id : generateId();
      const newEvent: SchedulerEvent = { ...event, id } as SchedulerEvent;

      set({ events: [...get().events, newEvent] });
      return newEvent;
    },

    updateEvent: (event) => {
      const events = get().events;
      const index = events.findIndex((e) => String(e.id) === String(event.id));
      if (index === -1) return;

      pushHistory();
      set({
        events: [...events.slice(0, index), { ...events[index], ...event }, ...events.slice(index + 1)],
      });
    },

    deleteEvent: (id) => {
      const events = get().events;
      const exists = events.some((e) => String(e.id) === String(id));
      if (!exists) return;

      pushHistory();
      set({ events: events.filter((e) => String(e.id) !== String(id)) });
    },

    undo: () => {
      const { past, future, events } = get();
      if (past.length === 0) return;

      const previous = past[past.length - 1];
      set({
        events: previous.events,
        past: past.slice(0, -1),
        future: [createSnapshot(events), ...future],
      });
    },

    redo: () => {
      const { past, future, events } = get();
      if (future.length === 0) return;

      const next = future[0];
      set({
        events: next.events,
        past: [...past, createSnapshot(events)],
        future: future.slice(1),
      });
    },
  };
});
~~~

## Building the control toolbar component

Create `src/components/Toolbar.tsx`. This is a small MUI toolbar to:

- switch view (day/week/month)
- navigate prev/today/next
- undo/redo

~~~tsx
import { ButtonGroup, Button, Typography, Stack } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import React from "react";
import type { SchedulerView } from "../types";

export interface ToolbarProps {
  currentView: SchedulerView;
  currentDate: Date;
  canUndo: boolean;
  canRedo: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onNavigate?: (action: "prev" | "next" | "today") => void;
  setView: (view: SchedulerView) => void;
}

export default React.memo(function Toolbar({
  currentView,
  currentDate,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onNavigate,
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

## Connect Scheduler to Zustand

Create `src/components/Scheduler.tsx`. This component:

- reads `events/view/currentDate/config` from the Zustand store via selectors
- exposes a `data.save` callback that calls store actions
- returns created/updated entities from `save` so Scheduler can sync its internal bookkeeping
- wires `undo/redo`
- hides the built-in navbar and uses the custom toolbar instead

~~~tsx
import { useCallback, useMemo } from "react";
import ReactScheduler from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

import Toolbar from "./Toolbar";
import { useSchedulerStore } from "../store";
import type { SchedulerEvent, SchedulerView } from "../types";

export default function DemoZustandScheduler() {
  const events = useSchedulerStore((s) => s.events);
  const view = useSchedulerStore((s) => s.view);
  const currentDate = useSchedulerStore((s) => s.currentDate);
  const config = useSchedulerStore((s) => s.config);

  const setView = useSchedulerStore((s) => s.setView);
  const setCurrentDate = useSchedulerStore((s) => s.setCurrentDate);
  const createEvent = useSchedulerStore((s) => s.createEvent);
  const updateEvent = useSchedulerStore((s) => s.updateEvent);
  const deleteEvent = useSchedulerStore((s) => s.deleteEvent);
  const undo = useSchedulerStore((s) => s.undo);
  const redo = useSchedulerStore((s) => s.redo);

  const canUndo = useSchedulerStore((s) => s.past.length > 0);
  const canRedo = useSchedulerStore((s) => s.future.length > 0);

  const activeDate = useMemo(() => new Date(currentDate), [currentDate]);

  const handleDateNavigation = useCallback((action: "prev" | "next" | "today") => {
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
  }, [currentDate, view, setCurrentDate]);

  // Scheduler <-> Zustand data bridge (maps Scheduler CRUD events to store actions)
  const dataBridge = useMemo(() => ({
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
          return updateEvent({ ...eventData, id: eventId } as Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">);
        }
        case "create":
          return createEvent(payload as Omit<SchedulerEvent, "id">);
        case "delete": {
          const deleteId =
            payload && typeof payload === "object"
              ? (payload as Record<string, unknown>).id ?? id
              : payload ?? id;
          if (deleteId == null) {
            console.warn("Delete called without an id", { payload, id });
            return;
          }
          return deleteEvent(deleteId as SchedulerEvent["id"]);
        }
        default:
          console.warn(`Unknown action: ${action}`);
          return;
      }
    },
  }), [updateEvent, createEvent, deleteEvent]);

  const handleViewChange = useCallback(
    (mode: string, date: Date) => {
      const nextView: SchedulerView = mode === "day" || mode === "week" || mode === "month" ? mode : "month";
      setView(nextView);
      setCurrentDate(date.getTime());
    },
    [setView, setCurrentDate]
  );

  const handleSetView = useCallback((nextView: SchedulerView) => setView(nextView), [setView]);

  const handleUndo = useCallback(() => undo(), [undo]);
  const handleRedo = useCallback(() => redo(), [redo]);
  const memoizedXY = useMemo(() => ({ nav_height: 0 }), []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Toolbar
        currentView={view}
        currentDate={activeDate}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onNavigate={handleDateNavigation}
        setView={handleSetView}
      />

      <ReactScheduler
        events={events}
        view={view}
        date={activeDate}
        xy={memoizedXY} /* hide built-in navbar */
        config={config}
        data={dataBridge}
        onViewChange={handleViewChange}
      />
    </div>
  );
}
~~~

Note that unlike Redux Toolkit, Zustand does not need a `Provider` wrapper. The `useSchedulerStore` hook reads directly from the store.

## Render the Scheduler in the app

Update `src/App.tsx`:

~~~tsx
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
  return <Scheduler />;
}

export default App;
~~~

## Summary

You now have React Scheduler fully driven by Zustand:

- Zustand keeps `events`, `view`, `currentDate`, and `config` as the single source of truth
- user edits are routed through `data.save` -> store actions
- the UI stays in sync because Scheduler receives updated `events` via props
- undo/redo is implemented via snapshot-based history with a capped history stack

## What's next

- Revisit the concepts behind this example in [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)
- Explore Scheduler's configuration and templating options in [React Scheduler overview](integrations/react/overview.md)
- Add persistence (load/save events from an API) by fetching in a Zustand action and updating the store
- Explore the same pattern with other state managers:
  - [Using React Scheduler with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Scheduler with MobX](integrations/react/state/mobx.md)
  - [Using React Scheduler with XState](integrations/react/state/xstate.md)
  - [Using React Scheduler with Valtio](integrations/react/state/valtio.md)
  - [Using React Scheduler with Jotai](integrations/react/state/jotai.md)
