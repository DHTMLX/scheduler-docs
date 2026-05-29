---
title: Using Vue Scheduler with Pinia
sidebar_label: Pinia
description: "Step-by-step Pinia integration for Vue Scheduler: store structure, callback wiring, and optional store-level undo/redo."
---

# Vue Scheduler + Pinia Tutorial

This tutorial shows a store-driven Vue Scheduler integration using Pinia. It follows the same architecture as the public Vue samples: the store owns `events`, and wrapper callbacks push scheduler edits back into the store.

## Prerequisites

- Vue 3 project
- Pinia installed (or permission to add it)
- Vue Scheduler package installed
- Basic reading of [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)

## 1. Install And Register Pinia

If Pinia is not installed yet:

~~~bash
npm install pinia
~~~

Register Pinia in `src/main.ts`:

~~~ts title="src/main.ts"
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

createApp(App).use(createPinia()).mount("#app");
~~~

## 2. Install Vue Scheduler

Install Vue Scheduler as described in the [Vue Scheduler installation guide](integrations/vue/installation.md).

In this tutorial we use the evaluation package:

~~~bash
npm install @dhtmlx/trial-vue-scheduler
~~~

or

~~~bash
yarn add @dhtmlx/trial-vue-scheduler
~~~

If you already use the Professional package, replace `@dhtmlx/trial-vue-scheduler` with `@dhx/vue-scheduler` in the commands and imports.

## 3. Add Demo Data

Create `src/demoData.ts`:

~~~ts title="src/demoData.ts"
import type { Event } from "@dhtmlx/trial-vue-scheduler";

export const mainDate = new Date("2026-08-15T00:00:00Z");

export const schedulerEvents: Event[] = [
  { id: 1, classname: "blue", start_date: new Date("2026-08-10T02:00:00Z"), end_date: new Date("2026-08-10T10:20:00Z"), text: "Product Strategy Hike" },
  { id: 2, classname: "blue", start_date: new Date("2026-08-10T12:00:00Z"), end_date: new Date("2026-08-10T16:00:00Z"), text: "Agile Meditation and Release" },
  { id: 3, classname: "violet", start_date: new Date("2026-08-11T06:00:00Z"), end_date: new Date("2026-08-11T11:00:00Z"), text: "Tranquil Tea Time" },
  { id: 4, classname: "green", start_date: new Date("2026-08-11T11:30:00Z"), end_date: new Date("2026-08-11T19:00:00Z"), text: "Sprint Review and Retreat" },
  { id: 5, classname: "violet", start_date: new Date("2026-08-12T01:00:00Z"), end_date: new Date("2026-08-12T03:00:00Z"), text: "Kayaking Workshop" },
  { id: 6, classname: "yellow", start_date: new Date("2026-08-12T06:00:00Z"), end_date: new Date("2026-08-12T08:00:00Z"), text: "Stakeholder Sunset Yoga Session" },
  { id: 7, classname: "green", start_date: new Date("2026-08-12T07:00:00Z"), end_date: new Date("2026-08-12T12:00:00Z"), text: "Roadmap Alignment Walk" },
  { id: 8, classname: "violet", start_date: new Date("2026-08-12T13:00:00Z"), end_date: new Date("2026-08-12T18:00:00Z"), text: "Mindful Team Building" },
  { id: 9, classname: "blue", start_date: new Date("2026-08-13T01:00:00Z"), end_date: new Date("2026-08-13T18:00:00Z"), text: "Cross-Functional Expedition" },
  { id: 10, classname: "yellow", start_date: new Date("2026-08-13T14:00:00Z"), end_date: new Date("2026-08-13T20:00:00Z"), text: "User Feedback Picnic" },
  { id: 11, classname: "blue", start_date: new Date("2026-08-14T03:00:00Z"), end_date: new Date("2026-08-14T08:00:00Z"), text: "Demo and Showcase" },
  { id: 12, classname: "yellow", start_date: new Date("2026-08-14T11:00:00Z"), end_date: new Date("2026-08-14T17:00:00Z"), text: "Quality Assurance Spa Day" },
  { id: 13, classname: "violet", start_date: new Date("2026-08-15T01:00:00Z"), end_date: new Date("2026-08-15T03:00:00Z"), text: "Motion Cycling Adventure" },
  { id: 14, classname: "blue", start_date: new Date("2026-08-15T10:00:00Z"), end_date: new Date("2026-08-15T16:00:00Z"), text: "Competitor Analysis Beach Day" },
  { id: 15, classname: "blue", start_date: new Date("2026-08-16T02:00:00Z"), end_date: new Date("2026-08-16T06:00:00Z"), text: "Creativity Painting Retreat" }
];
~~~

## 4. Create A Basic Scheduler Store

Create `src/stores/schedulerStore.ts`:

~~~ts title="src/stores/schedulerStore.ts"
import { defineStore } from "pinia";
import type { BatchChanges, Event } from "@dhtmlx/trial-vue-scheduler";
import { mainDate, schedulerEvents } from "../demoData";

type SchedulerView = "day" | "week" | "month";

const cloneDate = (value: Date | string | null | undefined): Date | string | null | undefined => {
  if (value instanceof Date) {
    return new Date(value.getTime());
  }
  return value;
};

const cloneEvent = (event: Event): Event => {
  const next: Event = { ...event };
  next.start_date = cloneDate(event.start_date) as Event["start_date"];
  next.end_date = cloneDate(event.end_date) as Event["end_date"];
  next.original_start = cloneDate(event.original_start) as Event["original_start"];
  return next;
};

const applyEventChange = (events: Event[], change: NonNullable<BatchChanges["events"]>[number]) => {
  if (change.action === "delete") {
    return events.filter(event => String(event.id) !== String(change.id));
  }

  const nextEvent = cloneEvent(change.data as Event);
  const exists = events.some(event => String(event.id) === String(change.id));

  if (change.action === "update") {
    return events.map(event => String(event.id) === String(change.id) ? { ...cloneEvent(event), ...nextEvent } : cloneEvent(event));
  }

  if (exists) {
    return events.map(event => String(event.id) === String(nextEvent.id) ? nextEvent : cloneEvent(event));
  }

  return [...events.map(cloneEvent), nextEvent];
};

export const useSchedulerStore = defineStore("scheduler", {
  state: () => ({
    events: schedulerEvents.map(cloneEvent),
    date: mainDate,
    view: "week" as SchedulerView,
  }),
  actions: {
    setView(view: SchedulerView) {
      if (this.view === view) {
        return;
      }
      this.view = view;
    },
    setDate(date: Date) {
      if (+this.date === +date) {
        return;
      }
      this.date = new Date(date.getTime());
    },
    applyBatch(changes: BatchChanges) {
      if (!changes.events?.length) {
        return;
      }

      this.events = changes.events.reduce(
        (nextEvents, change) => applyEventChange(nextEvents, change),
        this.events.map(cloneEvent)
      );
    },
  }
});
~~~

This store keeps one source of truth:

- `events` is canonical data
- `date` and `view` are independent states
- `applyBatch` is the wrapper callback entry point

## 5. Bind Store State To `VueScheduler`

Create `src/components/Scheduler.vue`:

~~~vue title="src/components/Scheduler.vue"
<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { VueScheduler } from "@dhtmlx/trial-vue-scheduler";
import type { SchedulerXY } from "@dhtmlx/trial-vue-scheduler";
import "@dhtmlx/trial-vue-scheduler/dist/vue-scheduler.css";

import { useSchedulerStore } from "../stores/schedulerStore";

const schedulerStore = useSchedulerStore();
const { events, date, view } = storeToRefs(schedulerStore);

const data = {
  batchSave: schedulerStore.applyBatch
};

const xy: SchedulerXY = {
  nav_height: 0
};

const formattedDate = computed(() =>
  date.value.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  })
);

function addDate(step: number) {
  const next = new Date(date.value);
  if (view.value === "day") {
    next.setDate(next.getDate() + step);
  } else if (view.value === "week") {
    next.setDate(next.getDate() + step * 7);
  } else {
    next.setMonth(next.getMonth() + step);
  }
  schedulerStore.setDate(next);
}
</script>

<template>
  <section class="demo-panel">
    <div class="demo-toolbar timeline-toolbar">
      <button :class="{ active: view === 'day' }" type="button" @click="schedulerStore.setView('day')">
        Day
      </button>
      <button :class="{ active: view === 'week' }" type="button" @click="schedulerStore.setView('week')">
        Week
      </button>
      <button :class="{ active: view === 'month' }" type="button" @click="schedulerStore.setView('month')">
        Month
      </button>
      <span class="toolbar-spacer" />
      <span class="toolbar-date">{{ formattedDate }}</span>
      <span class="toolbar-spacer" />
      <button type="button" @click="addDate(-1)">&lt;</button>
      <button type="button" @click="schedulerStore.setDate(new Date())">Today</button>
      <button type="button" @click="addDate(1)">&gt;</button>
    </div>

    <VueScheduler :events="events" :date="date" :view="view" :data="data" :xy="xy" />
  </section>
</template>
~~~

This is the core wrapper wiring:

- store values -> wrapper props
- `batchSave` -> store action
- store action -> new state -> wrapper props again

## 6. Render Scheduler In The App Shell

Replace `src/App.vue`:

~~~vue title="src/App.vue"
<script setup lang="ts">
import Scheduler from './components/Scheduler.vue'
</script>

<template>
  <div :style="{ height: '100vh', width: '100vw' }">
    <Scheduler />
  </div>
</template>
~~~

## 7. Verify The Data Flow

Use this flow for predictable updates:

1. Store exposes `events`, `date`, and `view`.
2. `VueScheduler` renders from props.
3. User edits in the scheduler trigger `data.batchSave`.
4. Store action (`applyBatch`) merges the changes.
5. Updated state flows back into `VueScheduler`.

Do not mix this with direct instance mutations unless you also update the store.

## 8. (Optional) Add Store-Level Undo/Redo

Use this if you want undo/redo while keeping Pinia as the source of truth.

### 8.1 Replace The Store With A History Version

Replace the store from step 2 with this version.

~~~ts title="src/stores/schedulerStore.ts"
import { defineStore } from "pinia";
import type { BatchChanges, Event } from "@dhx/vue-scheduler";
import { mainDate, schedulerEvents } from "../demoData";

type SchedulerView = "day" | "week" | "month";

type Snapshot = {
  events: Event[];
  date: Date;
  view: SchedulerView;
};

type HistoryState = {
  events: Event[];
  date: Date;
  view: SchedulerView;
  past: Snapshot[];
  future: Snapshot[];
  maxHistory: number;
};

const cloneDate = (value: Date | string | null | undefined): Date | string | null | undefined => {
  if (value instanceof Date) {
    return new Date(value.getTime());
  }
  return value;
};

const cloneEvent = (event: Event): Event => {
  const next: Event = { ...event };
  next.start_date = cloneDate(event.start_date) as Event["start_date"];
  next.end_date = cloneDate(event.end_date) as Event["end_date"];
  next.original_start = cloneDate(event.original_start) as Event["original_start"];
  return next;
};

const createSnapshot = (state: HistoryState): Snapshot => ({
  events: state.events.map(cloneEvent),
  date: new Date(state.date.getTime()),
  view: state.view
});

const applyEventChange = (events: Event[], change: NonNullable<BatchChanges["events"]>[number]) => {
  if (change.action === "delete") {
    return events.filter(event => String(event.id) !== String(change.id));
  }

  const nextEvent = cloneEvent(change.data as Event);
  const exists = events.some(event => String(event.id) === String(change.id));

  if (change.action === "update") {
    return events.map(event => String(event.id) === String(change.id) ? { ...cloneEvent(event), ...nextEvent } : cloneEvent(event));
  }

  if (exists) {
    return events.map(event => String(event.id) === String(nextEvent.id) ? nextEvent : cloneEvent(event));
  }

  return [...events.map(cloneEvent), nextEvent];
};

export const useSchedulerStore = defineStore("scheduler", {
  state: () => ({
    events: schedulerEvents.map(cloneEvent),
    date: mainDate,
    view: "week" as SchedulerView,
    past: [] as Snapshot[],
    future: [] as Snapshot[],
    maxHistory: 50
  }),
  getters: {
    canUndo: state => state.past.length > 0,
    canRedo: state => state.future.length > 0
  },
  actions: {
    pushHistory() {
      this.past = [...this.past, createSnapshot(this)];
      if (this.past.length > this.maxHistory) {
        this.past = this.past.slice(this.past.length - this.maxHistory);
      }
      this.future = [];
    },
    restoreSnapshot(snapshot: Snapshot) {
      this.events = snapshot.events.map(cloneEvent);
      this.date = new Date(snapshot.date.getTime());
      this.view = snapshot.view;
    },
    setView(view: SchedulerView) {
      if (this.view === view) {
        return;
      }
      this.pushHistory();
      this.view = view;
    },
    setDate(date: Date) {
      if (+this.date === +date) {
        return;
      }
      this.pushHistory();
      this.date = new Date(date.getTime());
    },
    applyBatch(changes: BatchChanges) {
      if (!changes.events?.length) {
        return;
      }

      this.pushHistory();
      this.events = changes.events.reduce(
        (nextEvents, change) => applyEventChange(nextEvents, change),
        this.events.map(cloneEvent)
      );
    },
    undo() {
      if (this.past.length === 0) {
        return;
      }

      const previous = this.past[this.past.length - 1];
      const current = createSnapshot(this);

      this.past = this.past.slice(0, -1);
      this.future = [current, ...this.future];
      this.restoreSnapshot(previous);
    },
    redo() {
      if (this.future.length === 0) {
        return;
      }

      const next = this.future[0];
      const current = createSnapshot(this);

      this.future = this.future.slice(1);
      this.past = [...this.past, current];
      if (this.past.length > this.maxHistory) {
        this.past = this.past.slice(this.past.length - this.maxHistory);
      }
      this.restoreSnapshot(next);
    }
  }
});
~~~

### 8.2 Add Undo/Redo Buttons To The Component

Update `src/components/Scheduler.vue`:

~~~vue title="src/components/Scheduler.vue"
<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { VueScheduler } from "@dhx/vue-scheduler";
import type { SchedulerXY } from "@dhx/vue-scheduler";
import "@dhx/vue-scheduler/dist/vue-scheduler.css";

import { useSchedulerStore } from "../stores/schedulerStore";

const schedulerStore = useSchedulerStore();
const { events, date, view, canUndo, canRedo } = storeToRefs(schedulerStore);

const data = {
  batchSave: schedulerStore.applyBatch
};

const xy: SchedulerXY = {
  nav_height: 0
};

const formattedDate = computed(() =>
  date.value.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  })
);

function addDate(step: number) {
  const next = new Date(date.value);
  if (view.value === "day") {
    next.setDate(next.getDate() + step);
  } else if (view.value === "week") {
    next.setDate(next.getDate() + step * 7);
  } else {
    next.setMonth(next.getMonth() + step);
  }
  schedulerStore.setDate(next);
}
</script>

<template>
  <section class="demo-panel" data-cy="state-management-demo">
    <div class="demo-toolbar timeline-toolbar">
      <button data-cy="state-undo" type="button" :disabled="!canUndo" @click="schedulerStore.undo()">Undo</button>
      <button data-cy="state-redo" type="button" :disabled="!canRedo" @click="schedulerStore.redo()">Redo</button>
      <button data-cy="view-day" :class="{ active: view === 'day' }" type="button" @click="schedulerStore.setView('day')">
        Day
      </button>
      <button data-cy="view-week" :class="{ active: view === 'week' }" type="button" @click="schedulerStore.setView('week')">
        Week
      </button>
      <button data-cy="view-month" :class="{ active: view === 'month' }" type="button" @click="schedulerStore.setView('month')">
        Month
      </button>
      <span class="toolbar-spacer" />
      <span class="toolbar-date">{{ formattedDate }}</span>
      <span class="toolbar-spacer" />
      <button data-cy="state-prev" type="button" @click="addDate(-1)">&lt;</button>
      <button data-cy="state-today" type="button" @click="schedulerStore.setDate(new Date())">Today</button>
      <button data-cy="state-next" type="button" @click="addDate(1)">&gt;</button>
    </div>

    <VueScheduler class="demo-scheduler" :events="events" :date="date" :view="view" :data="data" :xy="xy" />
  </section>
</template>
~~~

### 8.3 Why This Uses Store-Level History

Use store-level history here because the store is the source of truth:

- Vue UI and scheduler stay in sync through the same state transitions
- `maxHistory` keeps memory usage bounded
- any new mutation clears redo history automatically
- you avoid two independent history systems

## Result

You now have a Pinia-based integration where:

- Pinia owns `events`
- `data.batchSave` applies Scheduler edits to the store
- `VueScheduler` re-renders from store state
- undo/redo can be added without switching ownership to the Scheduler instance

## Common Pitfalls

- Replacing store state with stale API snapshots after Scheduler edits
- Using `data.save` for high-volume operations when `batchSave` is a better fit
- Mixing store ownership with direct instance mutations and not reconciling state

## GitHub demo repository

A complete working project that follows this tutorial is [provided on GitHub](https://github.com/DHTMLX/vue-scheduler-pinia-starter).

## What To Read Next

- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Configuration Reference](integrations/vue/configuration-props.md)
- [Vue Scheduler Overview](integrations/vue/overview.md)
- [Customization Patterns](integrations/vue/customization-patterns.md)