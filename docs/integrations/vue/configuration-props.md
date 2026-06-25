---
title: Using DHTMLX Scheduler Properties in VueScheduler
sidebar_label: Configuration
description: "Reference for VueScheduler props, data/lifecycle contracts, and exported Vue helpers/composables."
---

# Using DHTMLX Scheduler Properties in VueScheduler

This page documents the public Vue wrapper surface for `@dhtmlx/trial-vue-scheduler` and `@dhx/vue-scheduler`.

Use it as a reference after [Overview](integrations/vue/overview.md) or [Quick Start](integrations/vue/quick-start.md).

## Available Props

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`events`</td>
      <td>`Array<Event | SerializedEvent>`</td>
      <td>Event collection rendered in the scheduler.</td>
    </tr>
    <tr>
      <td>`view`</td>
      <td>`"day" \| "week" \| "month" \| "year" \| ...`</td>
      <td>Active Scheduler view.</td>
    </tr>
    <tr>
      <td>`date`</td>
      <td>`Date | string`</td>
      <td>Active date used to render the selected view.</td>
    </tr>
    <tr>
      <td>`markers`</td>
      <td>`Marker[]`</td>
      <td>Time markers (for example, non-working time blocks).</td>
    </tr>
    <tr>
      <td>`plugins`</td>
      <td>`SchedulerPlugins`</td>
      <td>Enables Scheduler plugins such as `recurring`, `collision`, `timeline`, `units`, `tooltip`, `quick_info`, etc. Pass as `{ recurring: true, collision: true }`.</td>
    </tr>
    <tr>
      <td>`data`</td>
      <td>`VueSchedulerDataConfig | null`</td>
      <td>Data loading and change handling callbacks/URLs.</td>
    </tr>
    <tr>
      <td>`locale`</td>
      <td>`string | Record&lt;string, any&gt;`</td>
      <td>Locale name or locale object. Defaults to `"en"`.</td>
    </tr>
    <tr>
      <td>`theme`</td>
      <td>`string`</td>
      <td>Skin name. Active skin: `"terrace"` (default)</td>
    </tr>
    <tr>
      <td>`templates`</td>
      <td>`Record<string, Function>`</td>
      <td>Merged into <code>scheduler.templates</code>.</td>
    </tr>
    <tr>
      <td>`config`</td>
      <td>`SchedulerConfig`</td>
      <td>Merged into <code>scheduler.config</code>.</td>
    </tr>
    <tr>
      <td>`xy`</td>
      <td>`SchedulerXY`</td>
      <td>UI sizing settings (for example, hiding built-in nav with `nav_height: 0`).</td>
    </tr>
    <tr>
      <td>`filter`</td>
      <td>`(event: Event) => boolean`</td>
      <td>Filters events displayed in Scheduler.</td>
    </tr>
    <tr>
      <td>`modals`</td>
      <td>`SchedulerModals | null`</td>
      <td>Overrides built-in delete confirmation dialogs.</td>
    </tr>
    <tr>
      <td>`eventBoxRenderer`</td>
      <td>`EventBoxRenderer | null`</td>
      <td>Custom renderer for the event box element.</td>
    </tr>
    <tr>
      <td>`views`</td>
      <td>`SchedulerViewsProp`</td>
      <td>Registers configurations for the available views. Use `TimelineViewConfig`, `UnitsViewConfig`, or `GridViewConfig` shapes.</td>
    </tr>
    <tr>
      <td>`customLightbox`</td>
      <td>`Component | null`</td>
      <td>Custom Vue event editor component.</td>
    </tr>
    <tr>
      <td>`templateWrapper`</td>
      <td>`(node: VNode) => VNode`</td>
      <td>Wraps template Vue elements with app-level providers (for example, a ThemeProvider) to avoid flicker during server-side render.</td>
    </tr>
    <tr>
      <td>`on<EventName>` listeners</td>
      <td>`(...args) => any`</td>
      <td>Vue listener props mapped to Scheduler events, for example `:onBeforeLightbox` or `:onViewChange`.</td>
    </tr>
  </tbody>
</table>

## Data Collections And Synchronization

Use `events` props when Vue state is your source of truth:

~~~vue
<VueScheduler
  :events="events"
/>
~~~

Sync behavior summary:

- events updates are usually diff-based
- the wrapper can switch to reset/re-parse for large changes

For model selection and callback strategy, see [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md).

## Config, Templates, Plugins, Theme, Locale

Use these props for Scheduler setup without imperative API calls.

~~~vue
<script setup lang="ts">
const config: SchedulerConfig = {
  first_hour: 6,
  last_hour: 22
};

const templates = {
  event_text: (_start: Date, _end: Date, event: Event) => `#${event.id}: ${event.text}`
};
</script>

<template>
  <VueScheduler
    :config="config"
    :templates="templates"
    theme="terrace"
    locale="en"
  />
</template>
~~~

## Events, Lifecycle, And Instance Access

### `on<EventName>`

Use Vue `on<EventName>` listener props for Scheduler events:

~~~vue
<script>
...
function beforeLightbox(eventId: string | number) {
  // your custom code here
  const event = schedulerRef.value?.instance?.getEvent(eventId);
  if (event?.$new) {
    return handleEventCreated(event);
  }
  return handleEditEvent(eventId);
}
...
</script>


<VueScheduler
  :events="events"
  :onBeforeLightbox="beforeLightbox"
  @ready="handleReady"
/>
~~~

### `@ready`

`ready(instance)` fires once after initialization and the first sync:

~~~vue
<VueScheduler :events="events" @ready="onReady" />
~~~

### `instance` Via Component Ref

~~~ts
import { ref } from "vue";
import type { VueSchedulerRef } from "@dhtmlx/trial-vue-scheduler";

const schedulerRef = ref<VueSchedulerRef | null>(null);

function showAlert() {
  schedulerRef.value?.instance?.alert({
    title:"Alert",
    type:"alert-error",
    text:"You can't do this"
  });
}
~~~

Use this for advanced operations that are not practical through props.

## Data Transport: `load`, `save`, `batchSave`

`data` prop shape:

~~~ts
interface VueSchedulerDataConfig {
  load?: string | ((scheduler: SchedulerStatic) => DataSet | Promise<DataSet>);
  save?: string | RouterFunction;
  batchSave?: (changes: BatchChanges) => void;
}
~~~

### `load`

- URL string -> `scheduler.load(url)`
- Function -> returns a sync or async dataset

### `save`

Per-change callback or router transport via dataProcessor.

### `batchSave`

Grouped callback for high-volume updates:

~~~ts
const data = {
  batchSave: changes => {
    if (changes.events?.length) {
      console.log("events changes", changes.events);
    }
  }
};
~~~

Use `batchSave` when one scheduler action can trigger many updates.

## Customization Hooks

### `customLightbox`

Replace the built-in event form UI with a Vue component.

### `modals`

Override delete confirmations and call `callback()` to confirm deletion.

~~~ts
const modals = {
  onBeforeEventDelete: ({ event, callback }) => {
    if (window.confirm(`Delete event ${event.text}?`)) callback();
  }
};
~~~

For practical examples, see [Customization Patterns](integrations/vue/customization-patterns.md).

## Filtering events

These props are often used together in advanced timeline views:

~~~vue
<script setup lang="ts">
  ...
  const query = ref("");
  const eventFilter = computed(() => {
    const value = query.value.trim().toLowerCase();
    return (event: any) => {
      if (!value) {
        return true;
      }
      return String(event.text || "").toLowerCase().includes(value);
    };
  });
</script>

<template>
  <VueScheduler
    ...
    :filter="eventFilter"
    ...
  />
</template>
~~~

## Exported Helpers And Composables

The package exports both a default `VueScheduler` component export and named exports.

From `@dhtmlx/trial-vue-scheduler` or `@dhx/vue-scheduler`:

### Type Exports

Import every type from the wrapper package itself (`@dhx/vue-scheduler` or `@dhtmlx/trial-vue-scheduler`). The wrapper bundles the underlying Scheduler engine and re-exports its types alongside the Vue-specific ones - there is no separate `@dhx/scheduler` package to install or import from.

**Wrapper-owned types**

| Export | Description |
|--------|------------|
| `SerializedEvent` | User-facing event shape with `Date \| string` dates. Use for store state, initial data, and `save`/`batchSave` payloads. |
| `VueSchedulerRef` | Type of the value exposed via component ref - `{ instance: SchedulerStatic \| null }`. |
| `VueSchedulerDataConfig` | Shape of the `data` prop (`load`, `save`, `batchSave`). |
| `BatchChanges` | Argument passed to `data.batchSave` - grouped `events` changes. |
| `DataCallbackChange` | Individual change entry inside a `BatchChanges` bucket - `{ entity, action, data, id }`. |
| `Marker` | Shape of items in the `markers` prop. |
| `SchedulerModals` | Shape of the `modals` prop - `onBeforeEventDelete` and `onRecurrenceConfirm` callback signatures. |
| `CustomLightboxProps` | Props received by your `customLightbox` component (`data`, `onSave`, `onCancel`, `onDelete`, `schedulerInstance`). |
| `VueSchedulerEventHandlers` | Type of the `events` prop - known events plus string-keyed custom events. |

**Frequently used types from the Scheduler engine**

The wrapper re-exports every type from the underlying Scheduler engine. The ones below come up most often in wrapper code - each row maps a core type to where it shows up in the Vue API.

| Export | Where it appears in wrapper code |
|--------|------------|
| `Event` | Runtime event shapes (include `$`-prefixed properties). Used inside event handlers, template callbacks, and filter functions. |
| `SchedulerStatic` | Type of `schedulerRef.value?.instance` and the `@ready` argument. |
| `SchedulerConfigOptions` | Shape of the object passed to the `config` prop. |
| `SchedulerPlugins` | Shape of the object passed to the `plugins` prop. |

Every other type from the Scheduler engine is also exported from the wrapper - if you can import a name from `@dhx/scheduler` in the standalone library, you can import it from `@dhx/vue-scheduler` here.

Use `SerializedEvent` for data you own (Pinia state, `ref<>`, API responses, initial literals). Use `Event` for data scheduler owns (inside event handlers, template callbacks, filter functions), where runtime event objects include internal `$`-prefixed properties.

### Composables

The wrapper exposes five composables that wrap common instance-side calls in a ref-aware, lifecycle-safe form. Each one takes a `Ref<VueSchedulerRef | null>` so it can wait for the instance to become available.


#### `useSchedulerEvent(schedulerRef, eventName, handler)`

Attaches a single Scheduler event with a lifecycle-safe lifetime. The handler is detached automatically on component unmount and re-attached if `schedulerRef`, `eventName`, or `handler` change. Returns `{ detach }` for manual control.

~~~ts
import { useSchedulerEvent } from "@dhtmlx/trial-vue-scheduler";

const { detach } = useSchedulerEvent(schedulerRef, "onDblClick", id => {
  console.log("dbl-click", id);
});

// Optional: detach early
// detach();
~~~

Use this when one-off listeners do not fit cleanly into the `events` map (for example listeners that need to update or unsubscribe based on local state).

#### `useSchedulerActions(schedulerRef)`

Returns wrapper-safe imperative actions:

| Method | Signature | Notes |
|--------|-----------|-------|
| `render()` | `() => void` | Forces a redraw for bulk mutations. |
| `exportToPDF(config?: ExportConfig)` | `() => void` | Requires `plugins: { export_api: true }`. Pass exporter options through `config`. |
| `exportToPNG(config?: ExportConfig)` | `() => void` | Requires `plugins: { export_api: true }`. Pass exporter options through `config`. |
| `exportToExcel(config?)` | `(config?: object) => void` | Requires `plugins: { export_api: true }`. Pass exporter options through `config`. |
| `exportToICal(config?: ExportConfig)` | `() => void` | Requires `plugins: { export_api: true }`. Pass exporter options through `config`. |

~~~ts
import { ref } from "vue";
import { useSchedulerActions, type VueSchedulerRef } from "@dhtmlx/trial-vue-scheduler";

const schedulerRef = ref<VueSchedulerRef | null>(null);
const actions = useSchedulerActions(schedulerRef);

const exportPdf = () => actions.exportToPDF();
const exportExcel = () => actions.exportToExcel();
~~~

## What To Read Next

- [Vue Scheduler Overview](integrations/vue/overview.md)
- [Customization Patterns](integrations/vue/customization-patterns.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Using Vue Scheduler with Pinia](integrations/vue/state/pinia.md)