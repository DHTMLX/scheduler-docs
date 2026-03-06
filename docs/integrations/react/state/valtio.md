---
sidebar_label: Valtio
title: Using React Scheduler with Valtio
description: Manage React Scheduler state with a Valtio proxy store, apply user edits via data.save, and add snapshot-based undo/redo.
---

# React Scheduler - Valtio Tutorial

This tutorial shows how to render **React Scheduler** in a Vite + React + TypeScript app and manage its state with **Valtio**. You will keep events, the current date, and the active view in a Valtio proxy store, then route user edits through the Scheduler's `data.save` callback.

By the end, you will have a Scheduler with:

- a reusable toolbar (view switcher, date navigation, undo/redo, read-only toggle)
- store-driven event CRUD (create/update/delete)
- snapshot-based undo/redo (events + config)

:::note
The complete source code is [available on GitHub](https://github.com/nicetip/react-scheduler-valtio-starter).
:::

## Prerequisites

- React + TypeScript basics
- Vite basics
- Basic familiarity with Valtio
- Recommended: read about React Scheduler data binding and `data.save` in [React Scheduler docs: Binding Data](integrations/react/state/state-management-basics.md)

## Creating a project

Create a Vite + React + TypeScript project:

~~~bash
npm create vite@latest scheduler-valtio-demo -- --template react-ts
cd scheduler-valtio-demo
~~~

## Installing dependencies

This tutorial uses:

- **Valtio** for state management
- **Material UI** for the toolbar UI

Install the packages:

~~~bash
npm install valtio @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

If you use Yarn:

~~~bash
yarn add valtio @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

## Installing React Scheduler

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

## Preparing app styles

React Scheduler expects a parent container with a deterministic height. Replace the default styles in `src/App.css` with:

~~~css title="src/App.css"
#root {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## Adding seed data

Create `src/seed/data.ts` with a small dataset and default view/date:

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
The companion demo includes additional events for a richer visual.
:::

## Creating a Valtio store

Create `src/store.ts`. This store owns:

- `events` (the events array passed to the Scheduler)
- `currentDate` and `view` (also passed as props)
- `config` (Scheduler configuration object, including `readonly`)
- `_past` / `_future` stacks for undo/redo history

The key detail is **snapshot-based history**: we store deep-cloned snapshots so that undo/redo does not keep references to mutable arrays. Navigation (`setCurrentDate`/`setView`) is intentionally **not undoable** — only data-modifying actions (CRUD, config changes) push to the history stack.

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

## Creating a reusable toolbar

Create `src/components/Toolbar.tsx`. This is a small MUI toolbar to:

- switch view (day/week/month)
- navigate prev/today/next
- undo/redo
- toggle read-only mode

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

## Rendering React Scheduler and connecting it to Valtio

Create `src/components/Scheduler.tsx`. This component:

- subscribes to the Valtio proxy via `useSnapshot`
- passes `events`, `date`, `view`, and `config` as React Scheduler props
- implements `data.save` with a `switch/case` bridge that routes changes into store actions
- wires `undo/redo` and the `read-only` config toggle
- hides the built-in navbar and uses the custom toolbar instead

~~~tsx title="src/components/Scheduler.tsx"
import { useCallback, useMemo } from "react";

// Trial import:
import ReactScheduler from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

// Pro import:
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

  // Scheduler <-> Valtio data bridge
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
        xy={memoizedXY} /* hide built-in navbar */
        config={snap.config}
        data={dataBridge}
        onViewChange={handleViewChange}
      />
    </div>
  );
}
~~~

## Mounting the Scheduler

Update `src/App.tsx`:

~~~tsx title="src/App.tsx"
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
  return <Scheduler />;
}

export default App;
~~~

## Run the application

Start the dev server:

~~~bash
npm run dev
~~~

or:

~~~bash
yarn dev
~~~

## Summary

In this tutorial you've:

- created a Vite + React project
- rendered React Scheduler with a deterministic full-height container
- modeled `events`, `view`, `currentDate`, and `config` in a single Valtio proxy store
- implemented snapshot-based undo/redo with `_past`/`_future` stacks (events + config)
- routed all Scheduler changes through `data.save` into store actions
- added a read-only toggle that locks the Scheduler from edits

This keeps the Scheduler component declarative (state -> props), while the store owns all mutation logic and history.

## What's next

- Explore the two supported data binding models in [React Scheduler docs: Binding Data](integrations/react/state/state-management-basics.md)
- Add custom templates and UI by using the `templates` prop
- Explore the same pattern with other state managers:
  - [Using React Scheduler with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Scheduler with MobX](integrations/react/state/mobx.md)
  - [Using React Scheduler with XState](integrations/react/state/xstate.md)
  - [Using React Scheduler with Zustand](integrations/react/state/zustand.md)
  - [Using React Scheduler with Jotai](integrations/react/state/jotai.md)
