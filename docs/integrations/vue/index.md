---
title: "Vue Scheduler"
sidebar_label: Vue Scheduler
description: "Install, configure, and use DHTMLX Scheduler in Vue with the official wrapper."
image: /img/frameworks/vue.png
---

Vue Scheduler is the official Vue wrapper for DHTMLX Scheduler. It targets Vue 3 and keeps full access to the Scheduler API while adding Vue-friendly props, events, and composables.

## What You Get With The Wrapper

- Declarative setup through props (`events`, `date`, `view`, `config`, `templates`, `plugins`, `theme`, `locale`, `markers`, `views`, `xy`, and `filter`.)
- Data sync for events
- Scheduler event wiring through the `on<EventName>` props
- Vue lifecycle entry point through `@ready`
- Component ref access to the underlying `instance`
- Typed helper factories and composables for common wrapper workflows

~~~vue
<script setup lang="ts">
import VueScheduler from "@dhtmlx/trial-vue-scheduler";
import "@dhtmlx/trial-vue-scheduler/dist/vue-scheduler.css";
</script>

<template>
  <div :style="{ height: 600px; }">
    <VueScheduler :events="events" />
  </div>
</template>
~~~

If you want the architecture and capability map first, read [Vue Scheduler Overview](integrations/vue/overview.md).

## Recommended Learning Path

Use this order if you are new to the wrapper:

1. [Installation](integrations/vue/installation.md) for package channel selection and imports
2. [Quick Start](integrations/vue/quick-start.md) to render your first Scheduler
3. [Configuration Reference](integrations/vue/configuration-props.md) for prop and callback details
4. [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md) to choose a data ownership model
5. [Pinia Integration Tutorial](integrations/vue/state/pinia.md) for a store-driven implementation
6. [Customization Patterns](integrations/vue/customization-patterns.md) for templates, lightbox, config and themes

## Wrapper Vs Low-Level JS Integration

Pick the integration path based on how much lifecycle and sync logic you want to manage yourself.

- Use the **official wrapper** (`@dhtmlx/trial-vue-scheduler` or `@dhx/vue-scheduler`) for Vue props/events, wrapper-managed synchronization, and typed helper APIs.
- Use **low-level JS integration** only when you want direct control over instance lifecycle and manual API orchestration.

For the low-level path, use [dhtmlxScheduler with Vue.js (Low-Level Integration)](integrations/vue/js-scheduler-vue.md).

## Data And State Management Entry Point

Start with the state section if you already know you need store/backend synchronization:

- [Data & State Management](integrations/vue/state.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Using Vue Scheduler with Pinia](integrations/vue/state/pinia.md)

## Examples and evaluation resources

Browse the public Vue Scheduler examples for runnable demos of the wrapper:

- [Live demo](https://dhtmlx.github.io/vue-scheduler-examples/) - all wrapper features running in the browser
- [GitHub repository](https://github.com/DHTMLX/vue-scheduler-examples) - source for every sample referenced in the overview

Minimal starter projects (one wrapper feature each):

- [vue-scheduler-quick-start](https://github.com/DHTMLX/vue-scheduler-quick-start) - smallest possible setup, matches the [Quick Start](integrations/vue/quick-start.md)
- [vue-scheduler-pinia-starter](https://github.com/DHTMLX/vue-scheduler-pinia-starter) - Pinia store with `batchSave` and store-level undo/redo, matches the [Pinia tutorial](integrations/vue/state/pinia.md)

If you're evaluating Vue Scheduler, the evaluation page provides access to technical support during the evaluation period. See [Installation](integrations/vue/installation.md).