---
title: Using DHTMLX Scheduler Properties in ReactScheduler
sidebar_label: Configuration
description: "Full reference of wrapper props mapped to Scheduler configuration, templates, events, and data callbacks."
---

# Using DHTMLX Scheduler Properties in ReactScheduler

This page describes the props accepted by **React Scheduler** and how they map to DHTMLX Scheduler APIs.

## Available props

| Prop | Type | Description |
|---|---|---|
| `events` | `Event[]` | Scheduler events to render. |
| `view` | `"day" \| "week" \| "month" \| "year" \| ...` | Active Scheduler view. |
| `date` | `Date` | Active date used to render the selected view. |
| `templates` | `SchedulerTemplates` | Maps to Scheduler templates (for example, event style/text rendering). |
| `config` | `SchedulerConfig` | Maps to Scheduler configuration options. |
| `xy` | `Record<string, number>` | UI sizing settings (for example, hiding built-in nav with `nav_height: 0`). |
| `data` | `{ load?: string \| (() => Promise<any>); save?: string \| SaveHandler; batchSave?: BatchSaveHandler }` | Data loading and change handling callbacks/URLs. |
| `customLightbox` | `ReactElement \| null` | Replaces built-in Lightbox with your React component. |
| `modals` | `SchedulerModals` | Overrides built-in confirmation dialogs (for example, event delete confirmation). |
| `filter` | `(event: Event) => boolean` | Filters events displayed in Scheduler. |
| `on<EventName>` props | `(...args) => any` | Event handlers mapped to Scheduler events (`onViewChange`, `onBeforeLightbox`, etc.). |

## Basic example

```tsx
import ReactScheduler, {
  type Event,
  type SchedulerConfig,
  type SchedulerTemplates,
} from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

const events: Event[] = [
  {
    id: 1,
    text: "Planning",
    start_date: new Date("2025-12-08T09:00:00Z"),
    end_date: new Date("2025-12-08T10:00:00Z"),
  },
];

const templates: SchedulerTemplates = {
  event_class: (_start, _end, event) => event.classname || "",
};

const config: SchedulerConfig = {
  first_hour: 6,
  last_hour: 22,
  hour_size_px: 60,
};

export default function Demo() {
  return (
    <ReactScheduler
      events={events}
      view="week"
      date={new Date("2025-12-08T00:00:00Z")}
      templates={templates}
      config={config}
    />
  );
}
```

## Data prop (`load`, `save`, `batchSave`)

Use the `data` prop to connect Scheduler to your backend or to React-managed state.

### Using backend URLs

```tsx
<ReactScheduler
  data={{
    load: "/api/scheduler/load",
    save: "/api/scheduler/save",
  }}
/>
```

### Using callback handlers

```tsx
<ReactScheduler
  data={{
    save: async (entity, action, item, id) => {
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
      }

      if (action === "delete") {
        await fetch(`/api/events/${id}`, { method: "DELETE" });
      }
    },
  }}
/>
```

## Template and config mapping

`templates` maps to Scheduler template functions, while `config` maps to Scheduler configuration options.

```tsx
<ReactScheduler
  templates={{
    event_class: (_start, _end, event) =>
      event.classname === "important" ? "event-important" : "",
  }}
  config={{
    first_hour: 7,
    last_hour: 21,
    time_step: 15,
  }}
/>
```

## Event props

You can pass Scheduler events as React props.

```tsx
<ReactScheduler
  onViewChange={(mode, date) => {
    console.log("View changed:", mode, date);
  }}
  onBeforeLightbox={(eventId) => {
    console.log("Opening editor for", eventId);
    return true;
  }}
/>
```

For the full list of supported events and callbacks, see:

- [Scheduler events overview](api/overview/events_overview.md)
- [Scheduler methods overview](api/overview/methods_overview.md)
- [Scheduler properties overview](api/overview/properties_overview.md)

## `customLightbox` and `modals`

Use `customLightbox` when you want to replace the built-in event editor with your own React component.
Use `modals` when you want custom confirmation dialogs.

```tsx
<ReactScheduler
  customLightbox={<MyLightbox />}
  modals={{
    onBeforeEventDelete: ({ event, callback }) => {
      if (window.confirm(`Delete "${event.text}"?`)) {
        callback();
      }
    },
  }}
/>
```

## Filtering events

```tsx
<ReactScheduler
  events={events}
  filter={(event) => event.text.toLowerCase().includes(search.toLowerCase())}
/>
```

## Direct API access through `ref`

If a use case is not covered by props, use a `ref` to get the underlying Scheduler instance.

```tsx
import { useEffect, useRef } from "react";
import ReactScheduler, { type ReactSchedulerRef } from "@dhx/react-scheduler";

export default function DirectApiDemo() {
  const schedulerRef = useRef<ReactSchedulerRef>(null);

  useEffect(() => {
    const scheduler = schedulerRef.current?.instance;
    if (!scheduler) return;

    console.log(scheduler.getEvents());
    scheduler.setCurrentView(new Date());
  }, []);

  return <ReactScheduler ref={schedulerRef} events={[]} />;
}
```

## Related pages

- [React Scheduler Overview](integrations/react/overview.md)
- [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)
- [Quick Start with React Scheduler](integrations/react/quick-start.md)
