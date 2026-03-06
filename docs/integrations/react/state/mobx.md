---
title: Using React Scheduler with MobX
sidebar_label: MobX
description: "Render React Scheduler from observable MobX state and handle create/update/delete via data.save with snapshot-based undo/redo."
---

# React Scheduler - MobX Tutorial

This tutorial shows how to render **DHTMLX React Scheduler** in a Vite + React + TypeScript app and drive it from a **MobX** store.
By the end, you'll have a working Scheduler that supports **create/update/delete**, **view + date navigation**, **snapshot-based undo/redo** for event changes, and a **read-only** toggle.

:::note
The complete source code is [available on GitHub](https://github.com/DHTMLX/react-scheduler-mobx-starter).
:::

You will build:

- a MobX store that owns `events`, current `view` and `date`
- a `data.save` bridge that converts Scheduler edits into store actions
- a simple toolbar (views, navigation, undo/redo, read-only toggle) that sits above the Scheduler

## Prerequisites

- Basic knowledge of React, TypeScript, Vite, and MobX
- Recommended: read [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md) to understand the data binding mode and the `data.save` callback this tutorial builds on.

## Quick setup - create the project

In this step we will create a Vite project, install dependencies, and verify the app runs.

Actions:

- Create a Vite React + TypeScript project
- Install MobX + UI dependencies
- Install React Scheduler (trial package)
- Remove Vite's default `App.css` styles so Scheduler can fill the viewport

Before you start, install [Node.js](https://nodejs.org/en/).

Create a Vite React + TypeScript project:

~~~bash
npm create vite@latest react-scheduler-mobx-demo -- --template react-ts
cd react-scheduler-mobx-demo
~~~

Now install the required dependencies.

* For **npm**:

~~~bash
npm install mobx mobx-react-lite @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* For **yarn**:

~~~bash
yarn add mobx mobx-react-lite @mui/material @mui/icons-material @emotion/react @emotion/styled
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

Now you can start the dev server:

~~~bash
npm run dev
~~~

You should now have your React project running on `http://localhost:5173`.

:::note
To make Scheduler occupy the entire space of the page, remove the default Vite styles from `src/App.css`.

Update `src/App.css` to the following.
:::

~~~css title="src/App.css"
#root, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## Setting up sample data

In this step we will create deterministic seed data for Scheduler so the demo looks the same on every run.

Actions:

- Create `src/seed/data.ts` with a small set of events
- Export an initial `view` and `date` so Scheduler starts in a predictable state

Create `src/seed/data.ts`:

~~~ts title="src/seed/data.ts"
export type SchedulerView = "day" | "week" | "month";

export interface SeedEvent {
  id: string | number;
  start_date: string;
  end_date: string;
  text: string;
}

export const seedEvents: SeedEvent[] = [
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

## Building the control toolbar component

In this step we will build a simple reusable toolbar that controls Scheduler navigation and history.

Actions:

- Create `src/components/Toolbar.tsx`
- Add buttons for **Day / Week / Month**
- Add **Prev / Today / Next** navigation buttons
- Add **Undo / Redo** buttons wired to callbacks
- Add a **Read-only** toggle switch

Create `src/components/Toolbar.tsx`:

~~~tsx title="src/components/Toolbar.tsx"
import { ButtonGroup, Button, Typography, Stack, FormControlLabel, Switch } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import React from "react";

export interface ToolbarProps {
  currentView: string;
  currentDate: Date;
  isReadOnly: boolean;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onNavigate?: (action: "prev" | "next" | "today") => void;
  onReadOnlyChange?: (value: boolean) => void;
  setView: (view: "day" | "week" | "month") => void;
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
          <Button
            key={label}
            variant={currentView === label ? "contained" : "outlined"}
            onClick={() => setView(label)}
          >
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </Button>
        ))}

        <ButtonGroup>
          <Button onClick={() => onUndo?.()} disabled={canUndo === false}>
            <UndoIcon />
          </Button>
          <Button onClick={() => onRedo?.()} disabled={canRedo === false}>
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
        {new Date(currentDate).toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </Typography>

      <ButtonGroup>
        <Button onClick={() => onNavigate?.("prev")}>&nbsp;&lt;&nbsp;</Button>
        <Button onClick={() => onNavigate?.("today")}>Today</Button>
        <Button onClick={() => onNavigate?.("next")}>&nbsp;&gt;&nbsp;</Button>
      </ButtonGroup>
    </Stack>
  );
});
~~~

## Setting up the MobX store

In this step we will create a MobX store that owns Scheduler state and implements snapshot-based undo/redo.

Actions:

- Create `src/store.ts`
- Store `events`, `view`, `currentDate`, and `config` as observable state
- Implement `createEvent`, `updateEvent`, `deleteEvent` methods
- Add `updateConfig` for read-only toggling
- Add `past`/`future` history stacks and `undo`/`redo` operations

Create `src/store.ts`:

~~~ts title="src/store.ts"
import { makeAutoObservable } from "mobx";
import type { SchedulerConfig } from "@dhtmlx/trial-react-scheduler";
import { seedEvents, seedView, seedDate, type SeedEvent, type SchedulerView } from "./seed/data";

export interface SchedulerEvent extends SeedEvent {
  /**
   * Extra Scheduler fields are allowed.
   * The demo only relies on id/start_date/end_date/text.
   */
  [key: string]: unknown;
}

interface Snapshot {
  events: SchedulerEvent[];
  config: SchedulerConfig;
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

class SchedulerStore {
  events: SchedulerEvent[] = seedEvents as SchedulerEvent[];
  view: SchedulerView = seedView;
  currentDate: number = seedDate;
  config: SchedulerConfig = {};

  past: Snapshot[] = [];
  future: Snapshot[] = [];
  maxHistory = 50;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get canUndo(): boolean {
    return this.past.length > 0;
  }

  get canRedo(): boolean {
    return this.future.length > 0;
  }

  private generateId(): string {
    return `id_${Date.now().toString()}`;
  }

  private snapshot(): Snapshot {
    return {
      events: cloneJson(this.events),
      config: cloneJson(this.config),
    };
  }

  private saveToHistory(): void {
    this.past.push(this.snapshot());
    if (this.past.length > this.maxHistory) {
      this.past.shift();
    }
    this.future = [];
  }

  private restore(snapshot: Snapshot): void {
    this.events = snapshot.events;
    this.config = snapshot.config;
  }

  /**
   * Navigation is not part of history: undo/redo in this demo is focused on event mutations.
   */
  setCurrentDate(date: number): void {
    this.currentDate = date;
  }

  /**
   * Navigation is not part of history: undo/redo in this demo is focused on event mutations.
   */
  setView(view: SchedulerView): void {
    this.view = view;
  }

  updateConfig(partial: Partial<SchedulerConfig>): void {
    this.saveToHistory();
    this.config = { ...this.config, ...partial };
  }

  /**
   * Called by Scheduler's data processor (data.save) on event creation.
   *
   * Important: we return the created event with a final id (simulating a backend-generated id),
   * so Scheduler can replace its temporary id and keep subsequent updates working correctly.
   */
  createEvent(eventDraft: Partial<SchedulerEvent>): SchedulerEvent {
    this.saveToHistory();

    const id = this.generateId();
    const newEvent: SchedulerEvent = {
      ...eventDraft,
      id,
      start_date: String(eventDraft.start_date ?? new Date().toISOString()),
      end_date: String(eventDraft.end_date ?? new Date().toISOString()),
      text: String(eventDraft.text ?? "(no title)"),
    };

    this.events = [...this.events, newEvent];
    return newEvent;
  }

  updateEvent(updatedEvent: Partial<SchedulerEvent> & { id: string | number }): void {
    this.saveToHistory();
    this.events = this.events.map((event) => {
      if (String(event.id) === String(updatedEvent.id)) {
        return { ...event, ...updatedEvent };
      }
      return event;
    });
  }

  deleteEvent(id: string | number): void {
    this.saveToHistory();
    this.events = this.events.filter((event) => String(event.id) !== String(id));
  }

  undo(): void {
    if (this.past.length === 0) {
      return;
    }

    const previous = this.past.pop();
    if (!previous) {
      return;
    }

    this.future.unshift(this.snapshot());
    this.restore(previous);
  }

  redo(): void {
    if (this.future.length === 0) {
      return;
    }

    const next = this.future.shift();
    if (!next) {
      return;
    }

    this.past.push(this.snapshot());
    this.restore(next);
  }
}

const schedulerStore = new SchedulerStore();
export default schedulerStore;
~~~

## Creating the main Scheduler component

In this step we will render React Scheduler and connect it to the MobX store.

Actions:

- Create `src/components/Scheduler.tsx`
- Wrap the component with `observer` so it re-renders on store changes
- Create a `data.save` bridge that calls store actions for create/update/delete
- Add `onViewChange` handler to sync internal Scheduler view changes to state
- Wire the read-only toggle through `updateConfig`
- Hide Scheduler's built-in navigation bar and use the toolbar instead

Create `src/components/Scheduler.tsx`:

~~~tsx title="src/components/Scheduler.tsx"
import { observer } from "mobx-react-lite";
import ReactScheduler from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";
import Toolbar from "./Toolbar";
import schedulerStore, { type SchedulerEvent } from "../store";
import type { SchedulerView } from "../seed/data";
import { useCallback, useMemo } from "react";

const DemoMobxScheduler = observer(() => {
  const {
    events,
    view,
    currentDate,
    config,
    canUndo,
    canRedo,
    setView,
    setCurrentDate,
    updateConfig,
    createEvent,
    updateEvent,
    deleteEvent,
    undo,
    redo,
  } = schedulerStore;

  const activeDate = useMemo(() => new Date(currentDate), [currentDate]);

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
      const nextView: SchedulerView =
        mode === "day" || mode === "week" || mode === "month" ? mode : "month";
      setView(nextView);
      setCurrentDate(date.getTime());
    },
    [setView, setCurrentDate]
  );

  const isReadOnly = Boolean((config as { readonly?: unknown }).readonly);
  const handleReadOnlyChange = useCallback(
    (value: boolean) => updateConfig({ readonly: value }),
    [updateConfig]
  );

  type DataAction = "create" | "update" | "delete";

  const dataBridge = useMemo(
    () => ({
      save: (entity: string, action: string, payload: unknown, id: string | number) => {
        if (entity !== "event") {
          return;
        }

        const safeAction = action as DataAction;

        if (safeAction === "update") {
          return updateEvent(payload as Partial<SchedulerEvent> & { id: string | number });
        }

        if (safeAction === "create") {
          // Important: return the created event with the final id.
          // This simulates a backend-generated id and keeps subsequent updates working.
          return createEvent(payload as Partial<SchedulerEvent>);
        }

        if (safeAction === "delete") {
          return deleteEvent(id);
        }

        console.warn(`Unknown data.save action: ${action}`);
        return;
      },
    }),
    [updateEvent, createEvent, deleteEvent]
  );

  const handleUndo = useCallback(() => undo(), [undo]);
  const handleRedo = useCallback(() => redo(), [redo]);

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
});

export default DemoMobxScheduler;
~~~

Finally, update `src/App.tsx` to render the Scheduler component:

~~~tsx title="src/App.tsx"
import { useEffect } from "react";
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = "DHTMLX React Scheduler - MobX Demo";
  }, []);

  return <Scheduler />;
}

export default App;
~~~

At this point, your app should render Scheduler with a custom toolbar above it.

## Run the application

In this step we will run the demo and verify editing and history.

Actions:

- Start the dev server (if it isn't running)
- Create/edit/drag events and confirm the store updates via `data.save`
- Use Undo/Redo to revert/apply event changes
- Toggle read-only mode to lock the Scheduler

Run:

~~~bash
npm run dev
~~~

Try it:

- Create an event (double-click in the calendar or use the built-in editor UI)
- Edit the event (change text/time)
- Drag an event to a new time slot
- Use **Undo** / **Redo** in the toolbar
- Toggle **Read-only** to lock Scheduler from edits

## Summary

In this tutorial you've:

- created a Vite + React project
- added React Scheduler and connected it to a MobX store
- implemented snapshot-based undo/redo using `past`/`future` history arrays
- drove events, view/date, and config from observable MobX state
- used the `data.save` callback so every Scheduler change becomes a store action
- a read-only config toggle lets you lock the Scheduler from edits

This keeps the Scheduler component fully declarative, while all mutation logic and history handling are encapsulated inside MobX state.

## What's next

To go further:

- Revisit the concepts behind this example in [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)
- Explore Scheduler's configuration and templating options in [React Scheduler overview](integrations/react/overview.md)
- Explore the same pattern with other state managers:
  - [Using React Scheduler with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Scheduler with Zustand](integrations/react/state/zustand.md)
  - [Using React Scheduler with XState](integrations/react/state/xstate.md)
  - [Using React Scheduler with Jotai](integrations/react/state/jotai.md)
  - [Using React Scheduler with Valtio](integrations/react/state/valtio.md)
