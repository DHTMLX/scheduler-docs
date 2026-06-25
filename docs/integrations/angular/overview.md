---
title: Angular Scheduler Overview
sidebar_label: Overview
description: "Architecture-level overview of Angular Scheduler: capabilities, data flow, events, lifecycle, and customization patterns."
---

# Angular Scheduler Overview

Angular Scheduler is the official Angular wrapper for DHTMLX Scheduler. It exposes the Scheduler as an Angular component (`<dhx-scheduler>`) with typed inputs/outputs and keeps access to the underlying Scheduler instance.

If you need installation and project setup first, start with [Quick Start with Angular Scheduler](integrations/angular/quick-start.md).


## Core Capabilities

The wrapper is built for both simple and advanced Angular integrations:

- Declarative setup with `events`, `date`, `view`, `config`, `templates`, `plugins`, `theme`, and `locale`.
- Controlled event synchronization through `events`.
- Change handling through `data.save` and `data.batchSave`.
- Callback wiring through `on<EventName>` inputs.
- Lifecycle signal via `(ready)` with access to the initialized Scheduler instance.
- Angular-based customization hooks: `customLightbox`, `eventBoxRenderer`, `modals`, and `templateComponent(...)`.
- Extra view registration through `views` for Timeline, Units, and Grid configurations.

## Basic Wrapper Usage

Use inputs for calendar data, configuration, and event handling.

~~~ts
import { Component } from "@angular/core";
import {
  DhxSchedulerComponent,
  type AngularSchedulerDataConfig,
  type Event,
  type SchedulerConfig,
} from "@dhx/angular-scheduler";

@Component({
  selector: "app-scheduler",
  standalone: true,
  imports: [DhxSchedulerComponent],
  template: `
    <dhx-scheduler
      [events]="events"
      [date]="date"
      [config]="config"
      [data]="data"
      view="week">
    </dhx-scheduler>
  `,
})
export class SchedulerComponent {
  date = new Date("2026-05-18T00:00:00");
  events: Event[] = [
    {
      id: 1,
      text: "Planning",
      start_date: new Date("2026-05-18T09:00:00"),
      end_date: new Date("2026-05-18T10:30:00"),
    },
  ];

  config: SchedulerConfig = {
    first_hour: 8,
    last_hour: 20,
    time_step: 30,
  };

  data: AngularSchedulerDataConfig = {
    save: (entity, action, item, id) => {
      console.log("[scheduler save]", entity, action, item, id);
    },
  };
}
~~~

For the full input list, use [Configuration Reference](integrations/angular/configuration-props.md).

## Choose A Data Ownership Model

The wrapper supports two main data ownership models.

- **Angular state or store as source of truth**: pass `events`, handle edits through `data.save` or `data.batchSave`, and update Angular state.
- **Scheduler as source of truth**: omit `events`, load data through `data.load`, and let Scheduler and your backend own the live data lifecycle.

When Angular owns the data, prefer typed `SerializedEvent[]` state so the rest of your application can react to Scheduler changes.

Use [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md) for full data ownership guidance.

## Handle Events

Use `on<EventName>` inputs for Scheduler callbacks and `(ready)` for one-time setup after initialization.

~~~html
<dhx-scheduler
  [events]="events"
  [onBeforeLightbox]="beforeLightbox"
  (ready)="onReady($event)">
</dhx-scheduler>
~~~

~~~ts
import type { SchedulerStatic } from "@dhtmlx/trial-angular-scheduler";

beforeLightbox = (eventId: string | number) => {
  console.log("before lightbox", eventId);
  return true;
};

onReady(event: { instance: SchedulerStatic }): void {
  console.log("ready", event.instance);
}
~~~

Use event inputs for interaction behavior. Use `(ready)` for logic that requires an initialized instance.

## ViewChild Access And Imperative Boundaries

When inputs are not enough, access the wrapper instance with `@ViewChild` and then use `.instance`.

~~~ts
import { Component, ViewChild } from "@angular/core";
import { DhxSchedulerComponent } from "@dhx/angular-scheduler";

export class DirectApiDemoComponent {
  @ViewChild(DhxSchedulerComponent) schedulerComponent?: DhxSchedulerComponent;

  showAlert(): void {
    this.schedulerComponent?.instance?.alert({
      title:"Alert",
      type:"alert-error",
      text:"You can't do this"
    });
  }
}
~~~

If you mutate event data through `instance`, keep Angular state in sync. Otherwise the next controlled `events` update can overwrite those changes.

## Advanced Extension Points

### Custom lightbox component

Use `customLightbox` to replace the built-in event lightbox with an Angular component.

~~~html
<dhx-scheduler [events]="events" [customLightbox]="CustomLightboxComponent"></dhx-scheduler>
~~~

Your custom component should accept `data`, `onSave`, `onCancel`, and `onDelete` inputs.

### Custom event box rendering

Render Scheduler event boxes yourself with `eventBoxRenderer`:

~~~ts
eventBoxRenderer = ({ event }) => `#${event.id}: ${event.text}`;
~~~

### Custom delete and recurrence confirmation flow

Override confirmations with `modals`:

~~~ts
modals = {
  onBeforeEventDelete: ({ event, callback }) => {
    if (window.confirm(`Delete ${event.text}?`)) callback();
  },
};
~~~

### Filtering

Use the `filter` input to specify which events should be displayed:

~~~ts
...
query = "";
get eventFilter() {
  const value = this.query.trim().toLowerCase();
  return (event: Event) => !value || String(event.text || "").toLowerCase().includes(value);
}
~~~

~~~html
  <dhx-scheduler
    [events]="events"
    [filter]="eventFilter"
    [views]="views"
  ></dhx-scheduler>
~~~


### Extra Scheduler views

Use `views` to configure [Timeline](views/timeline.md), [Units](views/units.md), or [Grid](views/grid.md) views and enable required plugins through `plugins` if needed.

## Related Articles

- [Configuration Reference](integrations/angular/configuration-props.md)
- [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md)
- [Using Angular Scheduler with RxJS](integrations/angular/state/rxjs.md)
- [dhtmlxScheduler with Angular](integrations/angular/js-scheduler-angular.md)
