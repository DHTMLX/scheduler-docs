---
title: Using DHTMLX Scheduler Properties in Angular Scheduler
sidebar_label: Configuration
description: "Full reference of Angular Scheduler inputs, output, callback contracts, and Angular-specific template/customization helpers."
---

# Using DHTMLX Scheduler Properties in Angular Scheduler

This page documents the public wrapper surface of `@dhtmlx/trial-angular-scheduler` and `@dhx/angular-scheduler`.

## Available Inputs

<table>
  <thead>
    <tr>
      <th>Input</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`events`</td>
      <td>`Array<Event \| SerializedEvent>`</td>
      <td>Event collection rendered in Scheduler.</td>
    </tr>
    <tr>
      <td>`date`</td>
      <td>`Date \| string`</td>
      <td>Active date used to render the selected view.</td>
    </tr>
    <tr>
      <td>`view`</td>
      <td>`string`</td>
      <td>Active Scheduler view. Defaults to `"week"`.</td>
    </tr>
    <tr>
      <td>`markers`</td>
      <td>`Marker[]`</td>
      <td>Time markers and blocked time spans.</td>
    </tr>
    <tr>
      <td>`plugins`</td>
      <td>`SchedulerPlugins`</td>
      <td>Plugin activation map, for example `{ recurring: true, timeline: true }`.</td>
    </tr>
    <tr>
      <td>`data`</td>
      <td>`AngularSchedulerDataConfig \| null`</td>
      <td>Transport callbacks: `load`, `save`, `batchSave`.</td>
    </tr>
    <tr>
      <td>`locale`</td>
      <td>`string \| Record<string, any>`</td>
      <td>Locale name or locale object. Defaults to `"en"`.</td>
    </tr>
    <tr>
      <td>`theme`</td>
      <td>`string`</td>
      <td>Scheduler skin name. Defaults to `"terrace"`.</td>
    </tr>
    <tr>
      <td>`templates`</td>
      <td>`AngularSchedulerTemplates`</td>
      <td>Merged into `scheduler.templates`; template functions can return Angular template descriptors.</td>
    </tr>
    <tr>
      <td>`config`</td>
      <td>`SchedulerConfig`</td>
      <td>Merged into `scheduler.config`.</td>
    </tr>
    <tr>
      <td>`xy`</td>
      <td>`SchedulerXY`</td>
      <td>Merged into `scheduler.xy` sizing options.</td>
    </tr>
    <tr>
      <td>`filter`</td>
      <td>`EventFilter`</td>
      <td>Predicate used to filter displayed events.</td>
    </tr>
    <tr>
      <td>`modals`</td>
      <td>`SchedulerModals \| null`</td>
      <td>Overrides built-in confirmation dialogs.</td>
    </tr>
    <tr>
      <td>`eventBoxRenderer`</td>
      <td>`EventBoxRenderer \| null`</td>
      <td>Custom renderer for event box elements.</td>
    </tr>
    <tr>
      <td>`views`</td>
      <td>`SchedulerViewsProp`</td>
      <td>Registers Timeline, Units, or Grid view configurations.</td>
    </tr>
    <tr>
      <td>`customLightbox`</td>
      <td>`CustomLightboxConfig \| Type<any> \| null`</td>
      <td>Replaces the built-in lightbox with an Angular component.</td>
    </tr>
    <tr>
      <td>`on<EventName>`</td>
      <td>`SchedulerCallback`</td>
      <td>Scheduler event handler input, for example `[onViewChange]` or `[onBeforeLightbox]`.</td>
    </tr>
  </tbody>
</table>


## Output And Instance Access

### `(ready)`

The wrapper emits `ready` once after initialization and initial synchronization.

Event payload shape:

~~~ts
{ instance: SchedulerStatic }
~~~

~~~html
<dhx-scheduler [events]="events" (ready)="onReady($event)"></dhx-scheduler>
~~~

~~~ts
onReady(event: { instance: SchedulerStatic }): void {
  event.instance.setCurrentView(new Date(), "week");
}
~~~

### `instance` via `@ViewChild`

Use `@ViewChild(DhxSchedulerComponent)` when you need direct imperative access.

~~~ts
@ViewChild(DhxSchedulerComponent) schedulerComponent?: DhxSchedulerComponent;

showToday(): void {
  this.schedulerComponent?.instance?.setCurrentView(new Date(), "week");
}
~~~

## Data Collections And Synchronization

Use `events` when Angular state or an RxJS store is your source of truth.

~~~html
<dhx-scheduler [events]="events" [date]="date" [view]="view"></dhx-scheduler>
~~~

Synchronization behavior summary:

- event updates are diff-based for routine changes,
- wrapper can reset and re-parse when a diff is not safe or effective,
- local Scheduler-created removals are reconciled with the next controlled `events` input.

Use [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md) for model tradeoffs.

## Config, Templates, Plugins, Theme, Locale

Use these inputs for declarative Scheduler setup instead of imperative `instance` calls.

~~~ts
config = {
  first_hour: 7,
  last_hour: 21,
  time_step: 30,
};

templates = {
  event_class: (_start: Date, _end: Date, event: any) =>
    event.classname ? `event-${event.classname}` : "",
};

plugins = {
  recurring: true,
  timeline: true,
};
~~~

~~~html
<dhx-scheduler
  [config]="config"
  [templates]="templates"
  [plugins]="plugins"
  [locale]="locale"
  [theme]="theme">
</dhx-scheduler>
~~~


## Event Handler Inputs

Pass Scheduler event handlers as `on<EventName>` inputs.

~~~ts
onViewChange = (mode: string, date: Date) => {
  console.log("view changed", mode, date);
};

onBeforeLightbox = (eventId: string | number) => {
  console.log("opening editor", eventId);
  return true;
};
~~~

~~~html
<dhx-scheduler
  [events]="events"
  [onViewChange]="onViewChange"
  [onBeforeLightbox]="onBeforeLightbox">
</dhx-scheduler>
~~~

The wrapper exposes typed inputs for common Scheduler events and applies them through the underlying `attachEvent` API.

## Data Transport: `load`, `save`, `batchSave`

`data` input shape:

~~~ts
interface AngularSchedulerDataConfig {
  load?: string | ((scheduler: SchedulerStatic) => Event[] | SerializedEvent[] | { data?: Event[] | SerializedEvent[] } | Promise<Event[] | SerializedEvent[] | { data?: Event[] | SerializedEvent[] }>);
  save?: string | RouterFunction;
  batchSave?: (changes: BatchChanges) => void;
}
~~~

### `load`

- URL string: wrapper calls Scheduler `scheduler.load(url)`
- Function -> wrapper calls it with the scheduler instance and parses the returned sync/async dataset.

~~~ts
dataConfig = {
  load: async () => {
    const response = await fetch("/api/scheduler");
    return response.json();
  },
};
~~~

`load` is intended for initial loading. Use it when Scheduler owns live runtime data or when you want the wrapper to parse an initial remote dataset.

### `save`

Per-change callback or transport wired through Scheduler data processing (wired through `scheduler.createDataProcessor(save)`).

~~~ts
dataConfig = {
  save: (entity, action, data, id) => {
    console.log(entity, action, data, id);
  },
};
~~~

For Scheduler event CRUD, `entity` is `"event"` and `action` is usually `"create"`, `"update"`, or `"delete"`.

### `batchSave`

Grouped callback for multiple changes in a short time window.

~~~ts
import type { BatchChanges } from "@dhx/angular-scheduler";

dataConfig = {
  batchSave: (changes: BatchChanges) => {
    if (changes.events?.length) {
      console.log("event changes", changes.events);
    }
  },
};
~~~

Queue behavior summary:

- near-term batching with a small debounce window,
- coalescing `create` plus `update` into one `create` with the latest payload,
- dropping `create` plus `delete` pairs,
- stripping internal `!nativeeditor_status` from payloads.

## Custom Lightbox

Use `customLightbox` to replace the built-in event lightbox with an Angular component.

~~~ts
import { CustomLightboxComponent } from "./custom-lightbox.component";

customLightbox = CustomLightboxComponent;
~~~

~~~html
<dhx-scheduler [events]="events" [customLightbox]="customLightbox"></dhx-scheduler>
~~~

The custom component receives these inputs from the wrapper:

- `data`
- `onSave(updatedEvent)`
- `onCancel()`
- `onDelete()`
- `schedulerInstance`

You can also pass a config object:

~~~ts
customLightbox = {
  component: CustomLightboxComponent,
  inputs: {
    mode: "compact",
  },
};
~~~

## Templates And Angular Components

Template functions can return regular strings/HTML (native Scheduler behavior) or Angular component descriptors created with `templateComponent(...)`.

~~~ts
import { templateComponent } from "@dhtmlx/trial-angular-scheduler";
import { EventTextTemplateComponent } from "./event-text-template.component";

templates = {
  event_text: (_start: Date, _end: Date, event: any) =>
    templateComponent(EventTextTemplateComponent, { event }),
};
~~~

Use this for template-capable Scheduler surfaces such as event text, event classes, scales, headers.

## Markers, Filters, Views, Modals, And Event Box Rendering

These inputs are typically used to help with customizations of the Scheduler.

~~~html
<dhx-scheduler
  [events]="events"
  [markers]="markers"
  [filter]="eventFilter"
  [views]="views"
  [modals]="modals"
  [eventBoxRenderer]="eventBoxRenderer">
</dhx-scheduler>
~~~

Notes:

- `filter` accepts a `(event: Event) => boolean` function or `null`.
- `views` registers Timeline, Units, or Grid configurations.
- `markers` are synchronized with Scheduler marked time spans.
- `modals` can override delete and recurrence confirmations.
- `eventBoxRenderer` can return a string, an `HTMLElement`, or an Angular template descriptor.

## Exported Types And Helpers

Useful public exports from the wrapper package:

- `DhxSchedulerComponent`
- `DhxSchedulerModule`
- `templateComponent(...)`
- `isAngularTemplateRenderable(...)`
- `AngularSchedulerDataConfig`
- `AngularSchedulerEventHandlers`
- `BatchChanges`, `DataCallbackChange`
- `Event`, `SerializedEvent`
- `SchedulerConfig`, `SchedulerXY`, `SchedulerPlugins`
- `SchedulerViewsProp`, `TimelineViewConfig`, `UnitsViewConfig`, `GridViewConfig`
- `EventFilter`, `EventBoxRenderer`
- `CustomLightboxConfig`, `CustomLightboxProps`
- `SchedulerModals`
- `Marker`
- `SchedulerStatic`

### `Event` vs `SerializedEvent`

- **`Event`**: use when application state stores `Date` objects.
- **`SerializedEvent`**: use when application state mirrors API payloads with string dates.

Pick one representation per screen to keep diffs, snapshots, and backend payloads predictable.

## Continue With

- [Angular Scheduler Overview](integrations/angular/overview.md)
- [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md)
- [RxJS State Management Tutorial](integrations/angular/state/rxjs.md)
- [dhtmlxScheduler with Angular](integrations/angular/js-scheduler-angular.md)
