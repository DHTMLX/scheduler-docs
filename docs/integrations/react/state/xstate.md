---
title: React Scheduler - XState Tutorial
sidebar_label: XState
description: "Integrate React Scheduler with XState. Covers modeling scheduler state in a machine, handling CRUD via data.save, and adding undo/redo + custom navigation."
---

# React Scheduler - XState Tutorial

This tutorial shows how to connect **DHTMLX React Scheduler** to an **XState** state machine. You will keep events and UI state (view/date/config) in the machine, route Scheduler edits through `data.save`, and add **undo/redo** with snapshot-based history.

:::note
The complete source code is [available on GitHub](https://github.com/DHTMLX/react-scheduler-xstate-starter).
:::

## Prerequisites

- Node.js (LTS recommended)
- React + TypeScript basics
- XState fundamentals (machines, events, actions). If you need a refresher, see the XState docs: https://stately.ai/docs/xstate

## Quick setup - create the project

Create a Vite + React + TS project:

~~~bash
npm create vite@latest scheduler-xstate-demo -- --template react-ts
cd scheduler-xstate-demo
npm install
~~~

Install XState + React bindings:

~~~bash
npm install xstate @xstate/react
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

## Setting up sample data

Create `src/seed/data.ts` with a few events and initial UI state. Notice that `date` is stored as a **number** (timestamp) so the machine context stays serializable.

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

- `SchedulerEvent` uses an index signature so Scheduler can attach extra fields at runtime.

:::note
The companion demo includes additional events with color classes for a richer visual.
:::

## Setting up the XState machine

Create `src/machine.ts`. This machine stores:

- `events` (Scheduler data)
- `date` (as timestamp)
- `view` (`day | week | month`)
- `config` (Scheduler configuration object)
- `past` / `future` (snapshot arrays for undo/redo)

Undo/redo is integrated directly into the machine using snapshots. Before every data-modifying action, `saveToHistory` saves a snapshot of the current events, view, and date. The `undo` and `redo` transitions swap the current state with a snapshot from the history.

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

At this point the machine provides:

- A single state source for the Scheduler props
- Snapshot-based undo/redo (the history contains copies, not references)
- A single `SET_DATE` event — navigation logic (prev/next/today) lives in the component

:::tip
If you target modern browsers only, the `deepClone()` helper already prefers `structuredClone()` and falls back to JSON cloning for older environments.
:::

## Building the control toolbar component

Create `src/components/Toolbar.tsx`. This is a small MUI toolbar to:

- switch view (day/week/month)
- navigate prev/today/next
- undo/redo with disabled state when history is empty

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

## Connect Scheduler to XState

Create `src/components/Scheduler.tsx`. This component:

- reads `events/view/date/config` from the XState machine context
- exposes a `data.save` callback that sends machine events
- wires `undo/redo` and navigation
- hides the built-in navbar and uses the custom toolbar instead
- applies color classes via the `event_class` template

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

A few details to notice:

- The machine context is the single source of truth for `events`, `view`, and `date`.
- The `data.save` handler converts entity-based Scheduler changes into machine events.
- We hide the built-in Scheduler navigation bar (`xy={{ nav_height: 0 }}`) and replace it with our own toolbar.
- The `event_class` template reads the `classname` field from each event and applies it as a CSS class.

## Event color styles

Create `src/components/styles.css` with CSS classes that match the `classname` values in the seed data. The `event_class` template applies these classes to each event element.

~~~css title="src/components/styles.css"
/*
  Event coloring.
  The Scheduler applies the value returned from templates.event_class to the event container.
  Seed data uses `classname`, so we map it via the template and style the classes here.
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

## Integrating Scheduler in the App

Update `src/App.tsx` and `src/App.css`:

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

## Summary

You now have React Scheduler fully driven by XState:

- Scheduler reads `events`, `view`, `date`, and `config` from the XState machine context
- User edits are routed through `data.save` -> machine events for CRUD
- The UI stays in sync because Scheduler receives updated state via props
- Undo/redo is implemented via snapshot-based history with `guard` conditions
- A custom toolbar provides view switching, date navigation, and undo/redo with disabled states

## What's next

- Revisit the concepts behind this example in [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)
- Explore Scheduler's configuration and templating options in [React Scheduler overview](integrations/react/overview.md)
- Add persistence (load/save events from an API) by dispatching async events to the machine
- Explore the same pattern with other state managers:
  - [Using React Scheduler with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Scheduler with MobX](integrations/react/state/mobx.md)
  - [Using React Scheduler with Zustand](integrations/react/state/zustand.md)
  - [Using React Scheduler with Jotai](integrations/react/state/jotai.md)
  - [Using React Scheduler with Valtio](integrations/react/state/valtio.md)
