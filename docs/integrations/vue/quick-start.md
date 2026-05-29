---
title: Quick Start with Vue Scheduler
sidebar_label: Quick Start
description: "Step-by-step guide to render the official Vue Scheduler wrapper in a Vue 3 + Vite app."
---

# Quick Start with Vue Scheduler

:::note
This tutorial covers the Vue wrapper included in the **Commercial, Enterprise, and Ultimate** editions of DHTMLX Scheduler. 
If you are using the **Individual** or **GPL** edition, follow the alternative guide: 
[How to Start with Vue](integrations/vue/js-scheduler-vue.md).
:::

The **Vue Scheduler** component is the official wrapper for **DHTMLX Scheduler**. 
This guide walks you through creating a small Vue 3 + Vite application and rendering a basic Scheduler using the trial package.

If you're new to Vue, start with the official [Vue documentation](https://vuejs.org/guide/introduction.html). 

Check [a complete working project that follows this tutorial on GitHub](https://github.com/DHTMLX/vue-scheduler-quick-start).

## Prerequisites

- Node.js installed
- npm or Yarn
- Vue 3 project (this page shows how to create one with Vite)
- Vue Scheduler package access (evaluation or professional)

## 1. Create A Vue 3 Project

Create a project with the official Vue scaffolding tool:

~~~bash
npm create vite@latest vue-scheduler-quick-start -- --template vue-ts
cd vue-scheduler-quick-start
npm install
~~~

If you prefer Yarn, replace the install step with `yarn`.

## 2. Install Vue Scheduler

Install Vue Scheduler as described in the [Vue Scheduler installation guide](integrations/vue/installation.md).

In this tutorial we use the evaluation package:

For evaluation:

~~~bash
npm install @dhtmlx/trial-vue-scheduler
~~~

or

~~~bash
yarn add @dhtmlx/trial-vue-scheduler
~~~

The examples below use the evaluation package. If you installed the professional package, replace imports with `@dhx/vue-scheduler`.

## 3. Add Demo Data

Create `src/demoData.ts`:

~~~ts title="src/demoData.ts"
import type { Event } from "@dhtmlx/trial-vue-scheduler";

export const seedEvents: Event[] = [
  {
    id: 1,
    text: "Planning",
    start_date: new Date("2026-05-18T09:00:00"),
    end_date: new Date("2026-05-18T10:30:00")
  },
  {
    id: 2,
    text: "Design review",
    start_date: new Date("2026-05-18T12:00:00"),
    end_date: new Date("2026-05-18T13:00:00")
  },
  {
    id: 3,
    text: "Implementation",
    start_date: new Date("2026-05-19T14:00:00"),
    end_date: new Date("2026-05-19T15:30:00")
  }
];
~~~

## 4. Create A Scheduler Component

Create `src/components/Scheduler.vue`:

~~~vue title="src/components/Scheduler.vue"
<script setup lang="ts">
import { ref } from "vue";
import {
  VueScheduler,
  defineSchedulerConfig,
  type Event,
  type VueSchedulerDataConfig
} from "@dhtmlx/trial-vue-scheduler";
import "@dhtmlx/trial-vue-scheduler/dist/vue-scheduler.css";
import { seedEvents } from "../demoData";

const events = ref<Event[]>(seedEvents);

const config = defineSchedulerConfig({
  first_hour: 8,
  last_hour: 20,
  time_step: 30
});

const data: VueSchedulerDataConfig = {
  save: (entity, action, item, id) => {
    console.log("save", { entity, action, item, id });
  }
};

</script>

<template>
  <div style="height: 100vh;">
    <VueScheduler
      :events="events"
      :date="new Date('2026-05-18T00:00:00')"
      view="week"
      :config="config"
      :data="data"
    />
  </div>
</template>
~~~

If you use the professional package, replace both imports:

- `@dhtmlx/trial-vue-scheduler` -> `@dhx/vue-scheduler`
- `@dhtmlx/trial-vue-scheduler/dist/vue-scheduler.css` -> `@dhx/vue-scheduler/dist/vue-scheduler.css`

## 5. Render Scheduler In The App Shell

Replace the default content in `src/App.vue`:

~~~vue title="src/App.vue"
<script setup lang="ts">
import Scheduler from "./components/Scheduler.vue";
</script>

<template>
  <Scheduler />
</template>
~~~

## 6. Start The App

Run the dev server:

~~~bash
npm run dev
~~~

Open the local URL printed by Vite. You should see Scheduler rendered in week view with the demo events.

## 7. (Optional) Replace Logging With Local Save Handling

Use this when you want Vue state to stay in sync with scheduler edits before adding a backend or store. Update `src/components/Scheduler.vue`.

~~~ts
const data: VueSchedulerDataConfig = {
  save: (entity, action, item, id) => {
    if (entity !== "event") return;

    if (action === "create") {
      events.value = [...events.value, item as Event];
      return;
    }

    if (action === "update") {
      events.value = events.value.map(event => (event.id === id ? { ...(item as Event) } : event));
      return;
    }

    if (action === "delete") {
      events.value = events.value.filter(event => event.id !== id);
    }
  }
};
~~~

## Result

You now have a Vue 3 app rendering the official Vue Scheduler wrapper with:

- reactive `events` props
- `data.save` callback wiring for user edits

## GitHub demo repository

A complete working project that follows this tutorial is [provided on GitHub](https://github.com/DHTMLX/vue-scheduler-quick-start).

## What To Read Next

- [Configuration Reference](integrations/vue/configuration-props.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Customization Patterns](integrations/vue/customization-patterns.md)
