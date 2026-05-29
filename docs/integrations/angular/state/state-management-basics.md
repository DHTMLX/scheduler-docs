---
title: Data Binding & Management Basics in Angular Scheduler
sidebar_label: Basics
description: "Choose the right data ownership model, implement callback contracts, and avoid sync pitfalls in Angular Scheduler."
---

# Data Binding & State Management in Angular Scheduler

Angular Scheduler supports two data ownership models:

1. **Angular state as the source of truth** (recommended for most applications).
2. **Scheduler as the source of truth** (performance-focused for specialized pages).

Choose one model per page/feature area and keep it consistent.

## Angular State Or Store As Source Of Truth

In this model:

- your component state or RxJS store owns `events`.
- the wrapper receives arrays through inputs.
- chart changes are captured via `data.save` or `data.batchSave`.
- callbacks update your state/store and new arrays flow back into `<dhx-scheduler>`.

### Best for

- Angular pages with toolbars/forms that must stay in sync with the chart.
- team codebases already built around services and RxJS.
- predictable state transitions and easier debugging.

### Tradeoffs

- more application-state updates for heavy scheduler operations.
- more frequent synchronization work during bulk edits.

### Anti-patterns to avoid

- mutating data through `instance` while still pushing stale `events` array from Angular state.
- ignoring `data.save` / `data.batchSave` and expecting scheduler edits to persist in your app state automatically.

### Full-flow example (component state)

~~~ts
import { Component } from "@angular/core";
import {
  DhxSchedulerComponent,
  type AngularSchedulerDataConfig,
  type Event,
} from "@dhtmlx/trial-angular-scheduler";

@Component({
  selector: "app-scheduler",
  standalone: true,
  imports: [DhxSchedulerComponent],
  template: `<dhx-scheduler [events]="events" [data]="dataConfig"></dhx-scheduler>`,
})
export class SchedulerComponent {
  events: Event[] = [
    {
      id: 1,
      text: "Planning",
      start_date: new Date("2026-05-18T09:00:00"),
      end_date: new Date("2026-05-18T10:30:00"),
    },
  ];

  dataConfig: AngularSchedulerDataConfig = {
    save: (entity, action, item, id) => {
      if (entity !== "event") return;

      if (action === "create") {
        this.events = [...this.events, item as Event];
        return;
      }

      if (action === "update") {
        this.events = this.events.map(event =>
          String(event.id) === String(id) ? { ...(item as Event) } : event
        );
        return;
      }

      if (action === "delete") {
        this.events = this.events.filter(event => String(event.id) !== String(id));
      }
    },
  };
}
~~~

## Scheduler As Source Of Truth

In this model, the chart and backend own most of the runtime data lifecycle.

### Best for

- very large datasets.
- scheduler-centric screens.
- heavy or chained edits where frequent app-store updates are expensive.

### Tradeoffs

- less immediate visibility of live chart state in Angular services/components.
- extra discipline required when mixing occasional input updates with imperative operations.

### Anti-patterns to avoid

- partial mirroring without a clear reconciliation plan.
- refeeding stale server snapshots after users already changed data in the chart.

### Server transport example

~~~ts
dataConfig = {
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
~~~

If your backend replaces temporary IDs on create, return `{ id: realId }` so Scheduler can reconcile client and server IDs.

## Callback Contracts {#callback-contracts}

### `data.save`

`save` is passed to `scheduler.createDataProcessor(save)` and receives per-change payloads.

Typical function shape:

~~~ts
(entity: string, action: string, data: any, id: string | number) => any
~~~

For Scheduler event CRUD:

- `entity` is `"event"`,
- `action` is `"create" | "update" | "delete"`,
- `data` is the created, updated, or deleted event,
- `id` is the affected event id.

### Bulk updates with `data.batchSave`

`data.batchSave` is useful when many changes are emitted in a short time.

Use it when you want to:

- reduce request count by sending grouped changes.
- process updates in one reducer or store transaction.

~~~ts
dataConfig = {
  batchSave: async changes => {
    await fetch("/api/events/batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes),
    });
  },
};
~~~

Use `save` for simple per-change logic, and `batchSave` for grouped synchronization.

## Loading Data Into Angular State

In the Angular-driven model, Scheduler gets data from Angular state. Common sources:

- local component fields,
- service state,
- RxJS store,
- API calls.

### Local state source

~~~ts
events: Event[] = seedEvents;
date = new Date("2026-05-18T00:00:00");
view = "week";
~~~

~~~html
<dhx-scheduler [events]="events" [date]="date" [view]="view"></dhx-scheduler>
~~~

### RxJS store source

Every store follows the same flow:

- observable reads state,
- `AsyncPipe` unwraps a view model,
- inputs feed Scheduler,
- `data.save` or `data.batchSave` calls store methods.

~~~html
@if (vm$ | async; as vm) {
  <dhx-scheduler
    [events]="vm.events"
    [date]="vm.date"
    [view]="vm.view"
    [data]="dataConfig">
  </dhx-scheduler>
}
~~~

See [Using Angular Scheduler with RxJS](integrations/angular/state/rxjs.md) for a complete example.

### API loading source

~~~ts
async ngOnInit(): Promise<void> {
  const response = await fetch("/api/events");
  const payload = await response.json();
  this.events = payload.events || [];
}
~~~

When Angular owns the data, prefer loading into Angular state and passing `events` to the wrapper.

## Scheduler As Source Of Truth

In this mode, Angular renders the component but does not hold canonical event state.

### URL transport example

~~~html
<dhx-scheduler
  [data]="{
    load: '/api/scheduler/load',
    save: '/api/scheduler/save'
  }">
</dhx-scheduler>
~~~

### Callback transport example

~~~ts
dataConfig = {
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
};
~~~

Use this approach when Scheduler can remain the primary runtime store and Angular does not need to render every individual update.

## What's Next

- [Using Angular Scheduler with RxJS](integrations/angular/state/rxjs.md)
- [Angular Scheduler Configuration](integrations/angular/configuration-props.md)
- [Server Integration](guides/server-integration.md)
