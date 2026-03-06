---
title: Data Binding & Management Basics in React Scheduler
sidebar_label: Basics
description: "Overview of the two data binding models in React Scheduler and baseline patterns for React state and state managers."
---

# Data Binding & State Management in React Scheduler

React Scheduler supports two data binding patterns:

1. **React state as the source of truth** (recommended for most React apps)
2. **Scheduler as the source of truth** (useful for specialized, high-throughput cases)

Both models are valid. Pick one model per screen and keep it consistent.

If you have not rendered a basic chart yet, start with [Quick Start](integrations/react/quick-start.md).

## Data models

### React state as the source of truth (recommended)

In this model:

- you keep `events` (and often `view` / `date`) in React state or a state manager
- you pass that state into `<ReactScheduler />` props
- Scheduler calls `data.save` / `data.batchSave` when users edit data
- you update state, and React re-renders Scheduler with the new props

Use this when other React components must stay synchronized with Scheduler data.

### Scheduler as the source of truth

In this model:

- Scheduler loads and mutates data internally
- you optionally forward edits to backend endpoints
- React does not mirror every event update in state

Use this model when React does not need to immediately reflect every individual Scheduler change.

## React state as source of truth {#reactstateasthesourceoftruth}

### Minimal example

```tsx
import { useMemo, useState } from "react";
import ReactScheduler, { type Event } from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

import { seedEvents } from "./seed/data";

export default function ReactStateScheduler() {
  const [events, setEvents] = useState<Event[]>(seedEvents);

  const data = useMemo(
    () => ({
      save: (entity: string, action: string, item: Event, id: string | number) => {
        if (entity !== "event") return;

        if (action === "create") {
          setEvents((prev) => [...prev, item]);
          return;
        }

        if (action === "update") {
          setEvents((prev) => prev.map((e) => (e.id === id ? item : e)));
          return;
        }

        if (action === "delete") {
          setEvents((prev) => prev.filter((e) => e.id !== id));
        }
      },
    }),
    []
  );

  return (
    <div style={{ height: "100vh" }}>
      <ReactScheduler events={events} data={data} />
    </div>
  );
}
```

This pattern makes React the canonical owner of event data.

## Handling updates with `data.save` {#handlingchangeswithdatasave}

`data.save` is called for each user change:

```ts
(entity: string, action: string, item: any, id: string | number) => void | Promise<any>
```

For Scheduler event CRUD:

- `entity` is `"event"`
- `action` is `"create" | "update" | "delete"`
- `item` is the created/updated/deleted event
- `id` is the affected event id

### Backend-oriented example

```tsx
const data = {
  save: async (entity: string, action: string, item: any, id: string | number) => {
    if (entity !== "event") return;

    if (action === "create") {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      const created = await response.json();
      return { id: created.id };
    }

    if (action === "update") {
      await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      return;
    }

    if (action === "delete") {
      await fetch(`/api/events/${id}`, { method: "DELETE" });
    }
  },
};
```

If your backend replaces temporary IDs on create, return `{ id: realId }` so Scheduler can reconcile client and server IDs.

## Bulk updates with `data.batchSave`

`data.batchSave` is useful when many changes are emitted in a short time (for example, dense editing sessions).

Use it when you want to:

- reduce request count by sending grouped changes
- process updates in one reducer/store transaction

```tsx
<ReactScheduler
  events={events}
  data={{
    batchSave: async (changes) => {
      await fetch("/api/events/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      });
    },
  }}
/>
```

Use `save` for simple per-change logic, and `batchSave` for grouped synchronization.

## Loading data into React state

In the React-driven model, Scheduler gets data from React state. Common sources:

- local component state
- global state manager (Redux Toolkit, Zustand, MobX, XState, Jotai, Valtio)
- API calls

### Local state source

```tsx
import { useState } from "react";
import ReactScheduler, { type Event } from "@dhtmlx/trial-react-scheduler";
import { seedEvents, seedView, seedDate } from "./seed/data";

export default function LocalStateExample() {
  const [events] = useState<Event[]>(seedEvents);

  return (
    <ReactScheduler
      events={events}
      view={seedView}
      date={seedDate}
    />
  );
}
```

### State manager source

Every library follows the same flow:

- selector/hook reads state
- props feed Scheduler
- `data.save` dispatches actions/store mutations

```tsx
const events = useSchedulerStore((s) => s.events);
const onSave = useSchedulerStore((s) => s.handleSave);

<ReactScheduler events={events} data={{ save: onSave }} />;
```

State-manager tutorials:

- [Using React Scheduler with Redux Toolkit](integrations/react/state/redux-toolkit.md)
- [Using React Scheduler with Zustand](integrations/react/state/zustand.md)
- [Using React Scheduler with MobX](integrations/react/state/mobx.md)
- [Using React Scheduler with XState](integrations/react/state/xstate.md)
- [Using React Scheduler with Jotai](integrations/react/state/jotai.md)
- [Using React Scheduler with Valtio](integrations/react/state/valtio.md)

### API loading source

```tsx
import { useEffect, useState } from "react";
import ReactScheduler, { type Event } from "@dhtmlx/trial-react-scheduler";

export default function SchedulerWithApi() {
  const [events, setEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    let disposed = false;

    (async () => {
      const response = await fetch("/api/events");
      const payload = await response.json();
      if (!disposed) setEvents(payload.events || []);
    })();

    return () => {
      disposed = true;
    };
  }, []);

  if (!events) return <div>Loading Scheduler...</div>;

  return <ReactScheduler events={events} />;
}
```

## Scheduler as source of truth {#schedulerasthesourceoftruth}

In this mode, React renders the component but does not hold canonical event state.

### URL transport example

```tsx
<ReactScheduler
  data={{
    load: "/api/scheduler/load",
    save: "/api/scheduler/save",
  }}
/>
```

### Callback transport example

```tsx
<ReactScheduler
  data={{
    load: async () => {
      const response = await fetch("/api/scheduler/load");
      return response.json();
    },
    save: async (entity, action, item, id) => {
      await fetch("/api/scheduler/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entity, action, item, id }),
      });
    },
  }}
/>
```

Use this approach when Scheduler can remain the primary runtime store and React does not need to render every single update.

## Choosing the right model

Use **React-driven** model when:

- multiple React components depend on Scheduler data
- you need predictable global state integration
- you want straightforward undo/redo in app state

Use **Scheduler-driven** model when:

- React is mostly shell/layout
- you prefer Scheduler-managed runtime mutations
- server transport is the primary synchronization mechanism

## What's next

- [React Scheduler Overview](integrations/react/overview.md#bindingdata)
- [React Scheduler Configuration](integrations/react/configuration-props.md)
- [Server Integration](guides/server-integration.md)

