---
title: React Scheduler - Redux Toolkit Tutorial
sidebar_label: Redux Toolkit
description: Learn how to integrate DHTMLX React Scheduler with Redux Toolkit, including event CRUD, view/date sync, and undo/redo.
---

# React Scheduler - Redux Toolkit Tutorial

This tutorial shows how to connect **DHTMLX React Scheduler** to a **Redux Toolkit** store. You will keep events and UI state (view/date/config) in Redux, route Scheduler edits through `data.save`, and add **undo/redo** with snapshot-based history and a **read-only** toggle.

:::note
The complete source code is [available on GitHub](https://github.com/DHTMLX/react-scheduler-redux-starter).
:::

## Prerequisites

- Node.js (LTS recommended)
- React + TypeScript basics
- Redux fundamentals (actions, reducers, store). If you need a refresher, see the Redux docs: https://redux.js.org/

## Quick setup - create the project

Create a Vite + React + TS project:

~~~bash
npm create vite@latest scheduler-redux-demo -- --template react-ts
cd scheduler-redux-demo
npm install
~~~

Install Redux Toolkit + React Redux:

~~~bash
npm install @reduxjs/toolkit react-redux
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

## Configure Redux store

Create `src/redux/store.ts`. This wires the `scheduler` reducer into the Redux store:

~~~ts
import { configureStore } from "@reduxjs/toolkit";
import schedulerReducer from "./schedulerSlice";

export const store = configureStore({
  reducer: {
    scheduler: schedulerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
~~~

## Define shared types

Create `src/redux/types.ts`. These types are shared across the slice, actions, and components:

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
  config: SchedulerConfig;
}
~~~

- `SchedulerEvent` uses an index signature so Scheduler can attach extra fields at runtime.
- `SchedulerSnapshot` captures the data needed for undo/redo (events + config).

## Setting up sample data

Create `src/seed/data.ts` with a few events and initial UI state. Notice that `currentDate` is stored as a **number** (timestamp) so the Redux state stays serializable.

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

## Define Scheduler actions (create/update/delete)

Scheduler edits will be routed through Redux actions. Create `src/redux/actions.ts`.

The `createEvent` action uses a "prepare" callback so it can generate a stable ID (simulating a backend-generated ID). We also add a small helper (`dispatchAction`) that returns the dispatched payload - this is useful because Scheduler's `data.save` can return the created/updated entity.

~~~ts
import { createAction } from "@reduxjs/toolkit";
import type { Dispatch } from "redux";
import type { SchedulerEvent } from "./types";

// Simulate receiving an ID from a backend.
const generateId = () => `id_${Date.now().toString()}`;

export const createEvent = createAction(
  "schedulerDomain/createEvent",
  (eventData: Omit<Partial<SchedulerEvent>, "id">) => {
    const newEvent: SchedulerEvent = {
      ...(eventData as Omit<SchedulerEvent, "id">),
      id: generateId(),
    };
    return { payload: newEvent };
  }
);

export const deleteEvent = createAction(
  "schedulerDomain/deleteEvent",
  (id: SchedulerEvent["id"]) => ({ payload: id })
);

export const updateEvent = createAction(
  "schedulerDomain/updateEvent",
  (eventData: Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">) => ({ payload: eventData })
);

// Helper function to dispatch an action and return its payload consistently
export function dispatchAction<Arg, Payload>(
  dispatch: Dispatch,
  actionCreator: (arg: Arg) => { type: string; payload: Payload },
  arg: Arg
): Payload {
  return dispatch(actionCreator(arg)).payload;
}
~~~

## Create the Redux slice

Now create `src/redux/schedulerSlice.ts`. This slice stores:

- `events` (Scheduler data)
- `currentDate` (as timestamp)
- `view` (`day | week | month`)
- `config` (Scheduler configuration object, including `readonly`)
- `past` / `future` (snapshot arrays for undo/redo)

Undo/redo is integrated directly into the slice using snapshots. Before every data-modifying action, `pushHistory` saves a snapshot of the current events and config. The `undo` and `redo` reducers swap the current state with a snapshot from the history.

~~~ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { seedEvents, seedDate, seedView } from "../seed/data";
import { createEvent, deleteEvent, updateEvent } from "./actions";
import type { SchedulerConfig, SchedulerEvent, SchedulerSnapshot, SchedulerView } from "./types";

interface SchedulerState {
  events: SchedulerEvent[];
  currentDate: number;
  view: SchedulerView;
  config: SchedulerConfig;

  past: SchedulerSnapshot[];
  future: SchedulerSnapshot[];
  maxHistory: number;
}

const deepCopy = <T,>(value: T): T => {
  // JSON clone is sufficient for this demo:
  // - events/config are plain objects
  // - we want immutable snapshots for undo/redo
  return JSON.parse(JSON.stringify(value)) as T;
};

const createSnapshot = (state: SchedulerState): SchedulerSnapshot => ({
  events: deepCopy(state.events),
  config: deepCopy(state.config),
});

const pushHistory = (state: SchedulerState) => {
  state.past.push(createSnapshot(state));

  if (state.maxHistory > 0 && state.past.length > state.maxHistory) {
    state.past.shift();
  }

  state.future = [];
};

const initialState: SchedulerState = {
  events: seedEvents as unknown as SchedulerEvent[],
  currentDate: seedDate,
  view: seedView as SchedulerView,
  config: {},

  past: [],
  future: [],
  maxHistory: 50,
};

const schedulerSlice = createSlice({
  name: "scheduler",
  initialState,
  reducers: {
    undo(state) {
      if (state.past.length === 0) return;

      const previous = state.past[state.past.length - 1];
      const newFuture = createSnapshot(state as SchedulerState);

      state.events = previous.events;
      state.config = previous.config;
      state.past = state.past.slice(0, -1);
      state.future = [newFuture, ...state.future];
    },
    redo(state) {
      if (state.future.length === 0) return;

      const next = state.future[0];
      const newPast = createSnapshot(state as SchedulerState);

      state.events = next.events;
      state.config = next.config;
      state.future = state.future.slice(1);
      state.past = [...state.past, newPast];
    },

    // Navigation is not an undoable user action in this demo.
    setCurrentDate(state, { payload }: PayloadAction<number>) {
      state.currentDate = payload;
    },
    setView(state, { payload }: PayloadAction<SchedulerView>) {
      state.view = payload;
    },

    updateConfig(state, { payload }: PayloadAction<Partial<SchedulerConfig>>) {
      pushHistory(state as SchedulerState);
      state.config = { ...state.config, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent, (state, action) => {
        pushHistory(state as SchedulerState);
        state.events.push(action.payload);
      })
      .addCase(deleteEvent, (state, action) => {
        pushHistory(state as SchedulerState);
        state.events = state.events.filter((e) => String(e.id) !== String(action.payload));
      })
      .addCase(updateEvent, (state, action) => {
        pushHistory(state as SchedulerState);

        const index = state.events.findIndex((e) => String(e.id) === String(action.payload.id));
        if (index !== -1) {
          state.events[index] = { ...state.events[index], ...action.payload };
        }
      });
  },
});

export const { undo, redo, setCurrentDate, setView, updateConfig } = schedulerSlice.actions;
export default schedulerSlice.reducer;
~~~

## Building the control toolbar component

Create `src/components/Toolbar.tsx`. This is a small MUI toolbar to:

- switch view (day/week/month)
- navigate prev/today/next
- undo/redo
- toggle read-only mode

~~~tsx
import { ButtonGroup, Button, Typography, Stack, FormControlLabel, Switch } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import React from "react";
import type { SchedulerView } from "../redux/types";

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

## Connect Scheduler to Redux

Create `src/components/Scheduler.tsx`. This component:

- reads `events/view/currentDate/config` from the flat Redux state
- exposes a `data.save` callback that dispatches Redux actions
- returns created/updated entities from `save` so Scheduler can sync its internal bookkeeping
- wires `undo/redo` and the `read-only` config toggle
- hides the built-in navbar and uses the custom toolbar instead

~~~tsx
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// Trial import:
// import ReactScheduler from "@dhtmlx/trial-react-scheduler";
// import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

// Pro import:
import ReactScheduler from "@dhx/react-scheduler";
import "@dhx/react-scheduler/dist/react-scheduler.css";

import Toolbar from "./Toolbar";
import { redo, setCurrentDate, setView, undo, updateConfig } from "../redux/schedulerSlice";
import { createEvent, updateEvent, deleteEvent, dispatchAction } from "../redux/actions";
import type { AppDispatch, RootState } from "../redux/store";
import type { SchedulerEvent, SchedulerView } from "../redux/types";

export default function ReactSchedulerReduxDemo() {
  const dispatch = useDispatch<AppDispatch>();
  const { past, future, events, view, currentDate, config } = useSelector((s: RootState) => s.scheduler);
  const canUndo = past.length > 0;
  const canRedo = future.length > 0;
  const activeDate = useMemo(() => new Date(currentDate), [currentDate]);
  const isReadOnly = Boolean((config as { readonly?: unknown }).readonly);

  const handleDateNavigation = useCallback((action: "prev" | "next" | "today") => {
    if (action === "today") {
      dispatch(setCurrentDate(Date.now()));
      return;
    }

    const step = action === "next" ? 1 : -1;
    const date = new Date(activeDate);

    if (view === "day") {
      date.setDate(date.getDate() + step);
    } else if (view === "week") {
      date.setDate(date.getDate() + step * 7);
    } else {
      date.setMonth(date.getMonth() + step);
    }
    dispatch(setCurrentDate(date.getTime()));
  }, [activeDate, view, dispatch]);

  // Scheduler <-> Redux data bridge
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

          const eventWithId = { ...eventData, id: eventId } as Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">;
          return dispatchAction(dispatch, updateEvent, eventWithId);
        }
        case "create":
          return dispatchAction(dispatch, createEvent, payload as Omit<Partial<SchedulerEvent>, "id">);
        case "delete": {
          const deleteId =
            payload && typeof payload === "object"
              ? (payload as Record<string, unknown>).id ?? id
              : payload ?? id;
          if (deleteId == null) {
            console.warn("Delete called without an id", { payload, id });
            return;
          }
          return dispatchAction(dispatch, deleteEvent, deleteId as SchedulerEvent["id"]);
        }
        default:
          console.warn(`Unknown action: ${action}`);
          return;
      }
    },
  }), [dispatch]);

  const handleViewChange = useCallback(
    (mode: string, date: Date) => {
      const nextView: SchedulerView = mode === "day" || mode === "week" || mode === "month" ? mode : "month";
      dispatch(setView(nextView));
      dispatch(setCurrentDate(date.getTime()));
    },
    [dispatch]
  );

  const handleSetView = useCallback((nextView: SchedulerView) => dispatch(setView(nextView)), [dispatch]);

  const handleUndo = useCallback(() => dispatch(undo()), [dispatch]);
  const handleRedo = useCallback(() => dispatch(redo()), [dispatch]);
  const handleReadOnlyChange = useCallback(
    (value: boolean) => dispatch(updateConfig({ readonly: value })),
    [dispatch]
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
        onUndo={handleUndo}
        onRedo={handleRedo}
        onNavigate={handleDateNavigation}
        onReadOnlyChange={handleReadOnlyChange}
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

## Integrating Redux Provider

Finally, wrap your app with the Redux `Provider`. Update `src/App.tsx`:

~~~tsx
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Scheduler />
    </Provider>
  );
}

export default App;
~~~

## Summary

You now have React Scheduler fully driven by Redux Toolkit:

- Scheduler reads `events`, `view`, `currentDate`, and `config` from Redux
- user edits are routed through `data.save` -> Redux actions
- the UI stays in sync because Scheduler receives updated `events` via props
- undo/redo is implemented via snapshot-based history integrated directly into the slice
- a read-only config toggle lets you lock the Scheduler from edits

## What's next

- Revisit the concepts behind this example in [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)
- Explore Scheduler's configuration and templating options in [React Scheduler overview](integrations/react/overview.md)
- Add persistence (load/save events from an API) by dispatching async thunks and updating the slice accordingly
- Explore the same pattern with other state managers:
  - [Using React Scheduler with MobX](integrations/react/state/mobx.md)
  - [Using React Scheduler with XState](integrations/react/state/xstate.md)
  - [Using React Scheduler with Zustand](integrations/react/state/zustand.md)
  - [Using React Scheduler with Valtio](integrations/react/state/valtio.md)
  - [Using React Scheduler with Jotai](integrations/react/state/jotai.md)
