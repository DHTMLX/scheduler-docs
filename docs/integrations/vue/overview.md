---
title: Vue Scheduler Overview
sidebar_label: Overview
description: "Architecture-level overview of Vue Scheduler: capabilities, data flow, listeners, lifecycle, and customization extension points."
---

# Vue Scheduler Overview

Vue Scheduler is the official Vue wrapper for DHTMLX Scheduler. It combines Vue-friendly composition patterns with full access to the underlying Scheduler engine.

If you need setup instructions first, start with [Quick Start with Vue Scheduler](integrations/vue/quick-start.md).

## Mental Model

Vue Scheduler is a wrapper around the DHTMLX Scheduler engine. The wrapper gives you a Vue component API, but the underlying engine is still the source of scheduler behavior and low-level methods.

The wrapper layer does three main jobs:

- initializes and destroys the Scheduler instance with Vue lifecycle
- syncs selected Vue props into the current Scheduler instance
- exposes wrapper-specific extension points (`on<EventName>` listeners, `@ready`, `customLightbox`, `eventBoxRenderer`, composables)

That means you can stay declarative for most integration work and still use `instance` when needed.

## Core Capabilities

The wrapper covers both basic and advanced integration scenarios:

- Declarative setup with props (`events`, `date`, `view`, `config`, `templates`, `plugins`, `theme`, `locale`)
- Controlled event synchronization through `events`
- Scheduler-owned loading through `data.load` when `events` is omitted
- Change handling through `data.save` and `data.batchSave`
- Callback wiring through Vue `on<EventName>` listeners and `useSchedulerEvent`
- One-time lifecycle hook through `@ready`
- Vue-based customization hooks (`customLightbox`, `eventBoxRenderer`, `modals`)
- Typed helpers and composables for reusable patterns

## Scenario: Basic Wrapper Setup

Use props for calendar data, configuration, and template customization.

~~~vue
<script setup lang="ts">
import {
  VueScheduler,
  defineSchedulerConfig,
  defineSchedulerTemplates,
  type Event
} from "@dhtmlx/trial-vue-scheduler";
import "@dhtmlx/trial-vue-scheduler/dist/vue-scheduler.css";

const events: Event[] = [
  {
    id: 1,
    text: "Planning",
    start_date: new Date("2026-05-18T09:00:00"),
    end_date: new Date("2026-05-18T10:30:00"),
    classname: "event-planning"
  }
];

const config = defineSchedulerConfig({
  first_hour: 8,
  last_hour: 20,
  time_step: 30
});

const templates = defineSchedulerTemplates({
  event_class: (_start, _end, event) => event.classname || ""
});
</script>

<template>
  <div :style="{ height: 600px; }">
    <VueScheduler
      :events="events"
      :date="new Date('2026-05-18T00:00:00')"
      view="week"
      :config="config"
      :templates="templates"
    />
  </div>
</template>
~~~

For the full prop list, use [Configuration Reference](integrations/vue/configuration-props.md).

## Choose A Data Ownership Model

The wrapper supports two main data ownership models.

- **Vue state/store as source of truth**: pass `events`, handle edits through `data.save` or `data.batchSave`, and update Vue state.
- **Scheduler as source of truth**: omit `events`, load data through `data.load`, and let Scheduler and your backend own the data lifecycle.

When Vue owns the data, prefer typed `SerializedEvent[]` state so other Vue components can react to Scheduler changes.

Use [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md) for the tradeoffs and callback contracts.

## Handle Events And Startup Logic

Use Vue `on<Eventname>` listeners for Scheduler callbacks and `@ready` for one-time setup after initialization.

~~~vue
<script setup lang="ts">
import type { SchedulerStatic } from "@dhtmlx/trial-vue-scheduler";

function beforeLightbox(eventId: string | number) {
  console.log("before lightbox", eventId);
  return true;
}

function onReady(instance: SchedulerStatic) {
  console.log("ready", instance);
}
</script>

<template>
  <VueScheduler :onBeforeLightbox="beforeLightbox" @ready="onReady" />
</template>
~~~

Use listeners for interaction behavior. Use `@ready` for initialization logic that needs a live instance.

## Cross The Imperative Boundary

Use a component ref when you need methods that are not practical to model through props.

~~~vue
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { VueScheduler, type VueSchedulerRef } from "@dhtmlx/trial-vue-scheduler";

const schedulerRef = ref<VueSchedulerRef | null>(null);

onMounted(() => {
  const scheduler = schedulerRef.value?.instance;
  schedulerRef.message({ 
    text:"Scheduler is mounted"
  });
});
</script>

<template>
  <VueScheduler ref="schedulerRef" />
</template>
~~~

If you mutate event data through `instance`, keep external state in sync. Otherwise the next controlled listener can overwrite those changes.

## Advanced Extension Points

### Custom lightbox component

Replace the built-in event form with a Vue component:

~~~vue
<VueScheduler :events="events" :customLightbox="CustomLightbox" :data="data" />
~~~

### Custom event box rendering

Render Scheduler event boxes yourself with `eventBoxRenderer`:

~~~ts
const eventBoxRenderer = ({ event }) => `#${event.id}: ${event.text}`;
~~~

### Custom delete and recurrence confirmation flow

Override confirmations with `modals`:

~~~ts
const modals = {
  onBeforeEventDelete: ({ event, callback }) => {
    if (window.confirm(`Delete ${event.text}?`)) callback();
  }
};
~~~

### Extra Scheduler views

Use `views` to configure [Timeline](views/timeline.md), [Units](views/units.md), or [Grid](views/grid.md) views and enable required plugins through `plugins` if needed.

## Related Articles

- [Configuration Reference](integrations/vue/configuration-props.md)
- [Customization Patterns](integrations/vue/customization-patterns.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Using Vue Scheduler with Pinia](integrations/vue/state/pinia.md)
- [DHTMLX Scheduler Guides](guides.md)
