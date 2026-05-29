---
title: Vue Scheduler Customization
sidebar_label: Customization
description: "Customization patterns for Vue Scheduler: templates, custom lightbox, modals, events, ready hook, and template wrapping."
---

# Vue Scheduler Customization

This guide covers the main customization layers in the Vue wrapper and when to use each one. Use it after you can render the wrapper and need application-specific UI or behavior.

Use this page with:

- [Vue Scheduler Overview](integrations/vue/overview.md)
- [Configuration Reference](integrations/vue/configuration-props.md)

## Choose The Right Customization Layer

Start with the lowest-cost option that solves the task:

- Use `config` and `templates` for visual output and built-in behavior changes
- Use `theme` and `locale` for scheduler-wide skin and language switches
- Return a Vue `VNode` from `h()` inside any template function - `templates.event_text`, `templates.tooltip_text`, scale/timeline cell templates, and column `template`/`label` - whenever you need an interactive or composable Vue element instead of a string
- Use `on<EventName>` and `@ready` for interaction rules and startup orchestration
- Use `modals` for delete-confirmation control
- Use `customLightbox` when edit UI must be application-specific and fits in a modal

Keep one data ownership model while customizing UI. If the scheduler edits data, make sure your Vue state strategy matches it.

## Template-Driven Visual Customization

Use `templates` for event text, CSS classes, scale labels, and grid output.

~~~vue
<script setup lang="ts">
const templates = {
  event_text: (_start: Date, _end: Date, event: Event) => `#${event.id}: ${event.text}`,
  event_class: (_start: Date, _end: Date, event: Event) => (event.priority === "high" ? "event--high" : "")
};
</script>

<template>
  <VueScheduler :events="events" :templates="templates" />
</template>
~~~

Use this when your changes map cleanly to native Scheduler template APIs.

## Themes, Locales, And Vue Components Inside Templates

Use the `theme` and `locale` props for scheduler skin and language switches. Use `h()` to return Vue `VNode`s from any template function - both the timeline-side `templates` prop (`event_text`, `tooltip_text`, `timeline_cell_content`, ...). The wrapper mounts the result into the right place - the event, the scale cell, or the tooltip.

- `theme` accepts the built-in skin names (for example `"terrace"`, `"dark"`)
- `locale` accepts a locale code (`"en"`, `"es"`, `"de"`, `"cn"`, ...) or a full locale object
- Any template function can return either a plain string/HTML (the native Scheduler template shape) or `h(Component, props)` for a Vue component
- Wire interaction (`onToggle`, `onClick`, ...) through Vue event props on the rendered component, the same way you would in a template

~~~vue
<script setup lang="ts">
import { h, ref } from "vue";
import { VueScheduler, defineSchedulerTemplates } from "@dhtmlx/trial-vue-scheduler";
import type { Marker, SchedulerConfig, VueSchedulerProps } from "@dhtmlx/trial-vue-scheduler";
import "@dhtmlx/trial-vue-scheduler/dist/vue-scheduler.css";

import EventTextBox from "../../components/EventTextBox.vue";
import { templateDate, templateEvents } from "../shared/demoData";

const theme = ref<"terrace" | "dark">("terrace");
const locale = ref<"en" | "es">("en");

const templates = defineSchedulerTemplates({
  event_class: (_start: Date, _end: Date, event: any) => `templates-${event.classname || ""}`,
  event_text: (_start: Date, _end: Date, event: any) => h(EventTextBox, { event })
});

const config: SchedulerConfig = {
  first_hour: 6,
  last_hour: 22,
  hour_size_px: 60,
  mark_now: false
};

function switchTheme() {
  theme.value = theme.value === "terrace" ? "dark" : "terrace";
}

function switchLocale() {
  locale.value = locale.value === "en" ? "es" : "en";
}
</script>

<template>
  <div class="demo-panel">
    <div class="demo-toolbar sample-actions">
      <button @click="switchTheme">Switch Theme</button>
      <button @click="switchLocale">Switch Locale</button>
    </div>
    <VueScheduler
      :date="templateDate"
      :events="templateEvents"
      :templates="templates"
      :config="config"
      :theme="theme"
      :locale="locale"
    />
  </div>
</template>
~~~

## Replace The Event Form (`customLightbox`)

Use `customLightbox` when the built-in lightbox is not enough and you need a Vue component for event editing.

~~~vue
<script setup lang="ts">
...
import CustomLightbox from "./CustomLightbox.vue";
</script>

<template>
  <VueScheduler 
    :customLightbox="CustomLightbox" 
  />
</template>
~~~

Your custom component receives:

- `data`
- `onSave(event)`
- `onCancel()`
- `onDelete()`
- `schedulerInstance`

~~~vue title='CustomLightbox.vue'
<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  data: any;
  onSave: (event: any) => void;
  onCancel: () => void;
  onDelete: () => void;
}>();

const description = ref(props.data?.text || "");

watch(
  () => props.data,
  next => {
    description.value = next?.text || "";
  },
  { immediate: true }
);

function save() {
  props.onSave({ ...props.data, text: description.value });
}
</script>

<template>
  <div class="modal-backdrop lightbox" data-cy="custom-lightbox" @click.self="props.onCancel">
    <div class="custom-lightbox-dialog">
      <div class="custom-lightbox-title">Edit Event</div>
      <label class="custom-lightbox-label" for="event_text">Description</label>
      <textarea id="event_text" v-model="description" class="custom-lightbox-textarea" autofocus />
      <div class="custom-lightbox-actions">
        <button data-cy="custom-lightbox-save" @click="save">Save</button>
        <button @click="props.onCancel">Cancel</button>
        <button @click="props.onDelete">Delete</button>
      </div>
    </div>
  </div>
</template>
~~~


## Replace The Lightbox With A Route

Use this pattern when the event editor needs its own page, deep-linkable URL, or layout that does not fit in a modal. Instead of supplying `customLightbox`, intercept lightbox events and route to a separate Vue Router view.

For a route-based editor, prevent the built-in lightbox with `onBeforeLightbox(eventId)`, then navigate to your editor route.

~~~ts
function beforeLightbox(eventId: string | number) {
  router.push(`/scheduler/editor/${eventId}`);
  return false;
}
~~~

~~~vue
<VueScheduler :events="events" :onBeforeLightbox="beforeLightbox" />
~~~

Use a shared store or parent state to let the editor update the same `events` array passed into Scheduler.

For modal-style replacement, prefer [`customLightbox`](#replace-the-event-form-customlightbox).

## Custom Delete Confirmation Modals

Use `modals` to replace built-in event deletion confirmations.

~~~ts
const modals = {
  onBeforeEventDelete: ({ event, callback }) => {
    if (window.confirm(`Delete ${event.text}?`)) {
      callback();
    }
  },
  onRecurrenceConfirm: context => {
    return context.options.includes("series") ? "series" : "occurrence";
  }
};
~~~

~~~vue
<VueScheduler :events="events" :modals="modals" />
~~~

note:::
Enable the `recurring` plugin when customizing recurrence behavior.
:::

## Timeline, Units, And Grid Views

Configure advanced views through the `views` prop. Check the whole list of timeline properties [here](api/method/createtimelineview.md)

~~~ts
const views = {
  timeline: {
    name: "rooms",
    render: "bar",
    y_property: "room_id",
    y_unit: [
      { key: 1, label: "Room 1" },
      { key: 2, label: "Room 2" }
    ],
    x_unit: "hour",
    x_step: 1,
    x_size: 12
  }
};
~~~

~~~vue
<VueScheduler
  :events="events"
  :plugins="{ timeline: true }"
  :views="views"
  view="rooms"
/>
~~~


## Continue With

- [Vue Scheduler Overview](integrations/vue/overview.md)
- [Configuration Reference](integrations/vue/configuration-props.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Using Vue Scheduler with Pinia](integrations/vue/state/pinia.md)