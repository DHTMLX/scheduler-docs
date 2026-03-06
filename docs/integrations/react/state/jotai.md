---
title: React Scheduler - Jotai Tutorial
sidebar_label: Jotai
description: Learn how to integrate DHTMLX React Scheduler with Jotai, including event CRUD, view/date sync, read-only config, and undo/redo.
---

# React Scheduler - Jotai Tutorial

This tutorial shows how to connect **DHTMLX React Scheduler** to a **Jotai** store. You will keep events and UI state (view/date/config) in atoms, route Scheduler edits through `data.save`, and add **undo/redo** with snapshot-based history.

:::note
The complete source code is [available on GitHub](https://github.com/DHTMLX/react-scheduler-jotai-starter).
:::

## Prerequisites

- Node.js (LTS recommended)
- React + TypeScript basics
- Familiarity with Jotai atoms and `useAtom`/`useSetAtom`. If you need a refresher, see the Jotai docs: https://jotai.org/

## Quick setup - create the project

Create a Vite + React + TypeScript project:

~~~bash
npm create vite@latest scheduler-jotai-demo -- --template react-ts
cd scheduler-jotai-demo
npm install
~~~

Install Jotai:

~~~bash
npm install jotai
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

Create `src/types.ts`. These types are shared across atoms and components:

~~~ts
export type SchedulerView = "day" | "week" | "month";
export type SchedulerEventId = string | number;

export interface SchedulerEvent {
  id: SchedulerEventId;
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

Create `src/seed/data.ts` with a few events and initial UI state. Notice that `seedDate` is stored as a **number** (timestamp) so atom state stays serializable.

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
The companion demo includes additional events for a richer visual.
:::

## Create Jotai atoms and actions

Create `src/schedulerAtoms.ts`. This setup stores:

- `events` (Scheduler data)
- `currentDate` (timestamp)
- `view` (`day | week | month`)
- `config` (Scheduler configuration object, including `readonly`)
- `past` / `future` snapshots for undo/redo

In this example, undo/redo tracks **event and config mutations only**. Date navigation and view switching are not added to history.

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

## Build the control toolbar

Create `src/components/Toolbar.tsx`. This toolbar will:

- switch view (day/week/month)
- navigate prev/today/next
- undo/redo with disabled states
- toggle read-only mode

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

## Connect Scheduler to Jotai

Create `src/components/Scheduler.tsx`. This component:

- reads `events/view/currentDate/config` from atoms
- bridges Scheduler CRUD (`create/update/delete`) via `data.save`
- wires `undo/redo`, navigation, and read-only toggling
- hides built-in Scheduler navbar and uses the custom toolbar

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

You now have React Scheduler fully driven by Jotai:

- Jotai atoms keep `events`, `view`, `currentDate`, and `config` as the single source of truth
- Scheduler edits are routed through `data.save` to typed Jotai actions
- undo/redo is implemented with snapshot-based history for event/config mutations
- a read-only config toggle lets you lock Scheduler from edits
- a custom toolbar handles navigation, view switching, and history controls

## What's next

- Revisit the concepts behind this example in [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)
- Explore Scheduler's configuration and templating options in [React Scheduler overview](integrations/react/overview.md)
- Add persistence by loading/saving events from an API and dispatching atom actions
- Explore the same pattern with other state managers:
  - [Using React Scheduler with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Scheduler with MobX](integrations/react/state/mobx.md)
  - [Using React Scheduler with XState](integrations/react/state/xstate.md)
  - [Using React Scheduler with Zustand](integrations/react/state/zustand.md)
  - [Using React Scheduler with Valtio](integrations/react/state/valtio.md)
