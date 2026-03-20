---
title: "React Scheduler"
sidebar_label: "Overview"
description: "Overview of the React Scheduler wrapper, data binding modes, customization options, and framework compatibility."
---

# React Scheduler

:::note
React Scheduler is available under [Commercial, Enterprise and Ultimate licenses](https://dhtmlx.com/docs/products/licenses.shtml).
If you're using Individual or GPL editions of Scheduler, use [dhtmlxScheduler with React](integrations/react/js-scheduler-react.md).
:::

## Overview

DHTMLX React Scheduler is the official React wrapper for DHTMLX Scheduler. It provides a declarative API for rendering and configuring Scheduler while still exposing the underlying Scheduler instance when you need advanced control.

**Key features:**

- pass `events`, `view`, and `date` as props
- customize behavior with `config` and `templates`
- handle user changes through `data.save` or `data.batchSave`
- use `ref` to access Scheduler API methods directly

If you're new to DHTMLX Scheduler, see the [DHTMLX Scheduler documentation](/guides/) for an overview of its features.

## Installation and npm access

For evaluation and professional package installation, see:

- [Installation](integrations/react/installation.md)

## Version requirements

- React `18+`

## Basic usage

```tsx
import { useMemo, useRef } from "react";
import ReactScheduler, {
  type Event,
  type ReactSchedulerRef,
  type SchedulerConfig,
  type SchedulerTemplates,
} from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

const events: Event[] = [
  {
    id: 1,
    text: "Product Strategy Hike",
    classname: "blue",
    start_date: new Date("2025-12-08T02:00:00Z"),
    end_date: new Date("2025-12-08T10:20:00Z"),
  },
];

export default function BasicSchedulerDemo() {
  const schedulerRef = useRef<ReactSchedulerRef>(null);

  const templates: SchedulerTemplates = useMemo(
    () => ({
      event_class: (_start, _end, event) => event.classname || "",
    }),
    []
  );

  const config: SchedulerConfig = useMemo(
    () => ({
      first_hour: 6,
      last_hour: 22,
      hour_size_px: 60,
    }),
    []
  );

  return (
    <div style={{ height: "100vh" }}>
      <ReactScheduler
        ref={schedulerRef}
        events={events}
        view="week"
        date={new Date("2025-12-08T00:00:00Z")}
        templates={templates}
        config={config}
      />
    </div>
  );
}
```

## Binding data {#bindingdata}

React Scheduler supports two data-binding models.

### React state as the source of truth (recommended)

In this model, React (or a state manager) owns event data:

- Scheduler reads events from props
- user changes call your `data.save` callback
- callback updates React state
- React re-renders Scheduler with updated props

```tsx
import { useMemo, useState } from "react";
import ReactScheduler, { type Event } from "@dhtmlx/trial-react-scheduler";

export default function ReactDrivenExample({ seedEvents }: { seedEvents: Event[] }) {
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

  return <ReactScheduler events={events} data={data} />;
}
```

This model is best when other React UI must stay synchronized with Scheduler data.

### Scheduler as the source of truth

In this model, Scheduler manages its internal state and forwards edits to your backend.

```tsx
<ReactScheduler
  data={{
    load: "/api/scheduler/load",
    save: "/api/scheduler/save",
  }}
/>
```

This model is useful when React does not need to mirror every update immediately.

### Loading data

You can load data using either props or `data.load`:

```tsx
// Props-based loading
<ReactScheduler events={eventsFromState} />

// Transport-based loading
<ReactScheduler data={{ load: "/api/scheduler/load" }} />
```

For data format requirements, see [Loading Data](guides/loading-data.md).

### Saving changes

`data.save` can be a URL or a callback.

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

For backend behavior details, see [Server Integration](guides/server-integration.md).

## Replacing the Lightbox

Scheduler includes a built-in event editor called [Lightbox](guides/lightbox-editors.md).

You can replace it by using `customLightbox`:

```tsx
import React, { useState } from 'react';

export interface CustomLightboxProps {
  data?: any;
  onSave?: (event: any) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

const CustomLightbox: React.FC<CustomLightboxProps> = ({
  data,
  onSave,
  onCancel,
  onDelete
}) => {

  let updatedEventText = data.text || "";

  const handleSaveClick = () => {
    if(onSave)
      onSave({ ...data, text: updatedEventText });
  };

  function PaperComponent(props: any) {
    const nodeRef = React.useRef(null);
    return (
      <Draggable
        nodeRef={nodeRef"
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"], input,textarea'}
      >
        <Paper {...props} ref={nodeRef}/>
      </Draggable>
    );
  }


  function TextComponent() {
    const [description, setDescription] = useState<string>(data.text || '');

    return (
      <TextField
        id="event_text"
        hiddenLabel
        multiline
        value="{description}"
        autoFocus
        onChange="{(e)" => {
          updatedEventText = e.target.value;
          setDescription(e.target.value)
        }}
        sx="{{" width: '100%', padding: '8px', marginTop: '10px' }}
      />
    )
  }


  return (
    <Dialog
      open={true}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      className="lightbox"
      onClose={onCancel}
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Edit Event
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Description
        </DialogContentText>

        <TextComponent />

        <DialogActions className='buttons'>
          <Button variant="contained" onClick={handleSaveClick}>Save</Button>
          <Button variant="contained" onClick={onCancel}>Cancel</Button>
          <Button variant="contained" onClick={onDelete}>Delete</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>

  );
};

export default CustomLightbox;
```

You can also intercept the editor opening with `onBeforeLightbox`:

```tsx
import { useEffect, useRef } from 'react';
import ReactScheduler from "@dhx/react-scheduler";
import "@dhx/react-scheduler/dist/react-scheduler.css";
import { useNavigate } from 'react-router-dom';


export default function BasicInitDemo() {
  const schedulerRef = useRef<any>(null);

  const { events, handleSaveEvent, handleDeleteEvent, createEvent } 
    = useOutletContext<SchedulerEditorContext>();
  const navigate = useNavigate();

  const handleEventEdit = (id: any) => {
    const schedulerInstance = schedulerRef.current?.instance;
    navigate(`/editor/${id}`, { state: { task: schedulerInstance.getTask(id) } });
  };

  return (
    <ReactScheduler 
      ref={schedulerRef}
      tasks={events}
      onBeforeLightbox={handleEventEdit} />
  );
}
```

Reference: [onBeforeLightbox](api/event/onbeforelightbox.md)

## Replacing built-in modals

The delete confirmation dialog can be overridden via `modals`.

```tsx
<ReactScheduler
  modals={{
    onBeforeEventDelete: ({ event, callback, schedulerInstance }) => {
      if (window.confirm(`Delete "${event.text}"?`)) {
        callback(); // calling the callback will delete the event
      }
    },
  }}
/>
```

### Customizing the Recurrence Confirmation Modal {#customizingtherecurrenceconfirmationmodal}

When a user edits or drags a recurring event, a confirmation modal asks whether to modify just this occurrence, this and following events, or the entire series. You can replace this built-in dialog with your own using `modals.onRecurrenceConfirm`.

The callback receives a context object and must return a decision (or a Promise that resolves to one):

| Field | Type | Description |
|---|---|---|
| `origin` | `"lightbox" \| "dnd"` | Whether the action was triggered from the lightbox or drag-and-drop |
| `occurrence` | `any` | The specific occurrence being edited |
| `series` | `any` | The parent recurring event |
| `labels` | `object` | Localized labels: `title`, `ok`, `cancel`, `occurrence`, `following`, `series` |
| `options` | `string[]` | Available choices, e.g. `["occurrence", "following", "series"]` |

Return value (`RecurrenceDecision`): `"occurrence"`, `"following"`, `"series"`, or `null` to cancel.

Example:

```tsx
import { useState, useCallback } from "react";

function App() {
  const [recurrencePrompt, setRecurrencePrompt] = useState(null);

  const onRecurrenceConfirm = useCallback((context) => {
    return new Promise((resolve) => {
      setRecurrencePrompt({ context, resolve });
    });
  }, []);

  return (
    <>
      <ReactScheduler
        modals={{ onRecurrenceConfirm }}
      />
      {recurrencePrompt && (
        <MyRecurrenceDialog
          options={recurrencePrompt.context.options}
          labels={recurrencePrompt.context.labels}
          onSelect={(choice) => {
            recurrencePrompt.resolve(choice);
            setRecurrencePrompt(null);
          }}
          onCancel={() => {
            recurrencePrompt.resolve(null);
            setRecurrencePrompt(null);
          }}
        />
      )}
    </>
  );
}
```

## Filtering

Use the `filter` prop to control which events are displayed:

```tsx
import { useCallback, useState } from "react";

function FilteredScheduler({ events }: { events: any[] }) {
  const [query, setQuery] = useState("");

  const filterFn = useCallback(
    (event: any) => {
      if (!query.trim()) return true;
      return event.text?.toLowerCase().includes(query.trim().toLowerCase());
    },
    [query]
  );

  return (
    <>
      <input
        placeholder="Search events..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ReactScheduler events={events} filter={filterFn} />
    </>
  );
}
```

## Accessing the underlying Scheduler API

When props are not enough, access the Scheduler instance through `ref`:

```tsx
import { useEffect, useRef } from "react";
import ReactScheduler, { type ReactSchedulerRef } from "@dhx/react-scheduler";

export function DirectRefExample({ events }: { events: any[] }) {
  const schedulerRef = useRef<ReactSchedulerRef>(null);

  useEffect(() => {
    const scheduler = schedulerRef.current?.instance;
    if (!scheduler) return;

    console.log("Events:", scheduler.getEvents());
    scheduler.setCurrentView(new Date());
  }, []);

  return <ReactScheduler ref={schedulerRef} events={events} />;
}
```

If you mutate Scheduler directly, keep React props synchronized to avoid state drift.

See [Scheduler Methods Overview](api/overview/methods_overview.md) for available methods.

#### Avoid conflicts with React props

- If you manually call `scheduler.parse(( events ))` or `scheduler.addEvent()` from your code, be aware you may need to keep the React props in sync. Otherwise, the next time React re-renders, it may overwrite your manual changes.
- The recommended approach is to rely on the wrapper's props for events, or manage them in your React state. Then let the wrapper handle re-parsing.


## Compatibility with SSR frameworks (Next.js, Remix)

:::note
React Scheduler is SSR-friendly. During server rendering, it outputs a placeholder container and hydrates on the client.
:::

Use framework-specific guides for details:

- [React Scheduler with Next.js](integrations/react/nextjs.md)
- [React Scheduler with Remix](integrations/react/remix.md)

## Next steps

- [Configuration](integrations/react/configuration-props.md)
- [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)
- [Quick Start](integrations/react/quick-start.md)
