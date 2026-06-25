---
title: Data Binding & State Management in Vue Scheduler
sidebar_label: Basics
description: "Choose a data ownership model for Vue Scheduler, wire save callbacks, and avoid state-sync pitfalls."
---

# Data Binding & State Management in Vue Scheduler

This guide helps you choose where your app owns Scheduler data and how to keep events edits synchronized. Pick one ownership model per page and keep it consistent.

Vue Scheduler supports two common models:

1. **Vue state/store as source of truth** (best default for most apps)
2. **Scheduler as source of truth** (performance-focused for chart-heavy pages)

## Mental Model

The wrapper syncs props into a live Scheduler instance. If users edit events, you decide whether:

- the wrapper callback updates Vue state (Vue-owned model), or
- the scheduler/backend handles changes directly (Scheduler-owned model)

The main pitfall is mixed ownership. If Vue and the Scheduler instance both act like the source of truth, stale data overwrites are likely.

## Vue State Or Store As Source Of Truth

In this model:

- Vue state (or as an example Pinia) owns `events`
- the wrapper receives arrays through props
- scheduler edits are captured via `data.save` or `data.batchSave`
- callback handlers update state
- updated state flows back into the wrapper

### Best For

- pages with surrounding Vue UI that must reflect scheduler state
- apps that already use Pinia or a centralized state layer
- teams that want predictable unidirectional data flow

### Tradeoffs

- more application-state updates for heavy operations
- more sync work when many edits happen in one scheduler action

### Avoid These Patterns

- mutating data through `instance` while continuing to pass stale arrays from Vue state
- ignoring wrapper callbacks and expecting scheduler edits to persist in Vue state automatically

### Example: Store/Vue-Owned Flow

~~~vue
<script setup lang="ts">
import { ref } from "vue";
import VueScheduler, {
  type VueSchedulerDataConfig
} from "@dhtmlx/trial-vue-scheduler";

const events = ref<SerializedEvent[]>([]);

const data: VueSchedulerDataConfig = {
  save: (entity, action, item, id) => {
    if (entity === "event") {
      if (action === "create") events.value = [...events.value, item as Event];
      if (action === "update") events.value = events.value.map(t => String(t.id) === String(id) ? item as Event : t);
      if (action === "delete") events.value = events.value.filter(t => String(t.id) !== String(id));
    }
  }
};
</script>

<template>
  <VueScheduler :events="events" :data="data" />
</template>
~~~

For multi-change operations, move to `data.batchSave` and apply changes in grouped batches.

## Scheduler As Source Of Truth

In this model, the scheduler and backend own most data lifecycle operations. Vue does less live mirroring.

### Best For

- very large datasets
- bulk update flows
- scheduler-focused pages where external UI does not need every live change immediately

### Tradeoffs

- less visibility of live scheduler state in Vue state/store
- more discipline required if you occasionally push prop snapshots back into the wrapper

### Avoid These Patterns

- partial Vue mirroring without a reconciliation strategy
- refeeding stale server snapshots after users edit the scheduler

### Example: Scheduler-Owned Transport

~~~vue
<script setup lang="ts">
import VueScheduler from "@dhtmlx/trial-vue-scheduler";

const data = {
  load: "/api/scheduler/load",
  save: async (entity: string, action: string, payload: any, id: string | number) => {
    const response = await fetch(`/api/scheduler/${entity}`, {
      method: action === "delete" ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, payload, id })
    });

    // Create handlers should return the persistent ID when backend remaps it.
    return await response.json();
  }
};
</script>

<template>
  <VueScheduler :data="data" />
</template>
~~~

## Callback Contracts

This section covers the wrapper callback shapes you use in both ownership models.

### `data.save`

`save` is passed to `scheduler.createDataProcessor(save)` and receives one change at a time.

Typical function shape:

~~~ts
(entity: string, action: string, data: any, id: string | number) => any
~~~

Use this when changes are mostly singular and easy to process one by one.

### `data.batchSave` {#databatchsave}

`batchSave` receives changes grouped into `events`:

~~~ts
interface BatchChanges {
  events?: DataCallbackChange[];
}
~~~

Summary:

- near-term flush batching
- `create` + `update` can be coalesced into one `create` with the latest payload
- `create` + `delete` can be removed from the batch
- internal `!nativeeditor_status` is stripped from payloads

Use this when one user action can produce many updates.

## ID Remapping And Backend Responsibility

Create actions often start with temporary client-side IDs.

- In `save` mode, backend responses should return persistent IDs so Scheduler can remap records.
- In `batchSave` mode, there is no per-item return path. If the server assigns IDs, handle remapping explicitly in your persistence workflow.

Backend responsibilities stay the same in both modes:

- validate incoming payloads
- enforce permissions
- persist authoritative IDs
- return data structures your selected transport mode expects

## What To Read Next

- [Using Vue Scheduler with Pinia](integrations/vue/state/pinia.md)
- [Configuration Reference](integrations/vue/configuration-props.md)
- [Customization Patterns](integrations/vue/customization-patterns.md)