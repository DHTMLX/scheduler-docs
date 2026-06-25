---
title: "dhtmlxScheduler with Vue.js"
sidebar_label: "Low-Level Integration"
description: "Step-by-step guide to using the JS DHTMLX Scheduler in a Vue app without the official Vue wrapper."
---

# dhtmlxScheduler with Vue.js

:::note
This tutorial shows how to use the JS DHTMLX Scheduler package directly in a Vue app without the official wrapper.

If you want Vue props/events, wrapper-managed sync, and wrapper composables, use [Vue Scheduler](integrations/vue.md) instead.
:::

This page is for low-level integration. You initialize and manage the Scheduler instance yourself.

## Prerequisites

- Node.js installed
- Basic Vue 3 knowledge (components, refs, lifecycle hooks)
- A Vue 3 project (this tutorial shows how to create one with Vite)

## Create A Vue Project

Create a Vue 3 app with Vite:

~~~bash
npm create vue@latest scheduler-vue-app
cd scheduler-vue-app
~~~

Install dependencies and start the dev server once to confirm the project works:

- npm:

~~~bash
npm install
npm run dev
~~~

- yarn:

~~~bash
yarn install
yarn dev
~~~

You should now have your Vue project running on **http://localhost:5173**.

![Scheduler Vue.js app running](/img/scheduler_vue_app_run.png)

## Creating Scheduler

Now we should get the DHTMLX Scheduler code. Firstly, we need to stop the app by pressing **Ctrl+C** in 
the command line. Then we can proceed with installing the Scheduler package.


## Step 1. Package installation

The PRO versions of the library are available for the **npm/yarn** install from our private repository, please follow 
[this instruction](guides/installation.md#npm---evaluation-and-pro-versions) to gain access to it.

After you've got the Evaluation version of the Scheduler, you can install it with the following commands:

- for npm:

~~~
npm install @dhx/trial-scheduler
~~~

- for yarn:

~~~
yarn add @dhx/trial-scheduler
~~~

Alternatively, since the zip-package of the library is structured as an **npm** module, you can 
[install it from a local folder](guides/installation.md#installing-the-package-from-a-local-folder).

## Step 2. Component creation

Now we should create a Vue component, to add a Scheduler into the application. Let's create a new 
file in the ***src/components/*** directory and name it ***Scheduler.vue***.

### Importing source files

Open the newly created ***Scheduler.vue*** file and import Scheduler source files. Note that:

- if you've installed the Scheduler package from a local folder, your import paths will look like this:


~~~js title="Scheduler.vue"
import { Scheduler } from "dhtmlx-scheduler";
…
<style>
  @import "@dhtmlx-scheduler/codebase/dhtmlxscheduler.css";
</style>
~~~

- if you've chosen to install the trial version, the import paths should be as in:

~~~js title="Scheduler.vue"
import { Scheduler } from "@dhx/trial-scheduler";
…
<style>
  @import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
</style>
~~~

In this tutorial we will use the **trial** version of Scheduler.

### Setting the container and adding Scheduler

To display Scheduler on the page, we need to set the container to render the component inside. Check the code below:


~~~html  title="Scheduler.vue"
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { Scheduler } from "@dhx/trial-scheduler";

const schedulerContainer = ref(null);
const schedulerInstance = ref(null);

onMounted(() => {
  const scheduler = Scheduler.getSchedulerInstance();
  schedulerInstance.value = scheduler;

  scheduler.config.header = [
    "day",
    "week",
    "month",
    "date",
    "prev",
    "today",
    "next",
  ];

  scheduler.init(schedulerContainer.value, new Date(2027, 5, 10), "week");
});

onUnmounted(() => {
  schedulerInstance.value?.destructor();
  schedulerInstance.value = null;

  if (schedulerContainer.value) {
    schedulerContainer.value.innerHTML = "";
  }
});
</script>

<template>
  <div ref="schedulerContainer"></div>
</template>

<style>
  @import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
  .dhx_cal_container {
    height: 100vh;
    width: 100%;
  }
</style>
~~~

To make the Scheduler container occupy the entire space of the body, you need to remove the default 
styles add the following one:

~~~css
body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## Step 3. Adding Scheduler into the app

Now it's time to add the component into our app. Open ***src/App.vue*** and use the Scheduler component 
instead of the default content by inserting the code below:

~~~html  title="src/App.vue"
<script setup>
import Scheduler from "./Scheduler.vue"
</script>

<template>
  <Scheduler/>
</template>

<style>
body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>
~~~

After that, when we start the app, we should see an empty Scheduler on a page:

![Scheduler Vue init](/img/scheduler_init.png)

## Step 4. Providing Data

To add data into the Scheduler, we need to provide a data set. Let's create the ***data.js*** file in the ***src/*** directory and add some data into it:


~~~js title="src/data.ts"
export function getData() {
    const data = [
        {
            start_date: "2026-06-10 6:00",
            end_date: "2026-06-10 8:00",
            text: "Event 1",
            id: 1,
        },
        {
            start_date: "2026-06-13 10:00",
            end_date: "2026-06-13 18:00",
            text: "Event 2",
            id: 2,
        },
    ];
    return data;
}
~~~

We should [pass props (our data)](https://vuejs.org/guide/components/props.html) to a Scheduler component in ***App.vue***:


~~~html title="App.vue"
<script setup>
import Scheduler from "./Scheduler.vue"
import { getData } from "./data.ts";
</script>

<template>
  <Scheduler :events="getData()"/>
</template>
~~~

And then use props in the **scheduler.parse()** method in the Scheduler component:


~~~html title="Scheduler.vue"
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { Scheduler } from "@dhx/trial-scheduler";

const schedulerContainer = ref(null);
const schedulerInstance = ref(null);

const props = defineProps({
  events: {
    type: Array,
    default: () => [],
  },
});

onMounted(() => {
  const scheduler = Scheduler.getSchedulerInstance();
  schedulerInstance.value = scheduler;

  scheduler.config.header = [
    "day",
    "week",
    "month",
    "date",
    "prev",
    "today",
    "next",
  ];

  scheduler.init(schedulerContainer.value, new Date(2027, 5, 10), "week");
  scheduler.parse(props.events);
});

onUnmounted(() => {
  schedulerInstance.value?.destructor();
  schedulerInstance.value = null;

  if (schedulerContainer.value) {
    schedulerContainer.value.innerHTML = "";
  }
});
</script>

<template>
  <div ref="schedulerContainer"></div>
</template>
~~~

Now, if you reopen the app page, you should see a Scheduler with events:

![Scheduler Vue events](/img/scheduler_events.png)

## Step 5. Saving Data

To capture changes made in the Scheduler, you can use the [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html) handler that lets you 
"communicate" with the server-side backend. The handler can be declared either as a function or as a router object.
dhtmlxScheduler accepts Promise response from the handler, so your Scheduler will correctly process the completion of an action. 

You can create a **DataProcessor** via the **createDataProcessor()** API method and capture changes like this:

~~~
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

If your service changes the event id after creating a new record (which it usually does), make sure that 
your Promise returns an object with **(id: databaseId)** or **(tid: databaseId)** as a result, so 
Scheduler could apply the new database id to the record. Get [more information about the server side](guides/server-integration.md).

Well, Vue Scheduler is ready, you are welcome to [check out the full demo on GitHub](https://github.com/DHTMLX/vue-scheduler-demo).


## XSS, CSRF and SQL Injection Attacks

Pay attention that Scheduler doesn't provide any means of preventing an application from various threats, such as SQL injections or 
XSS and CSRF attacks. It is important that responsibility for keeping an application safe is on the developers implementing the backend.

Check the [Application Security](guides/app-security.md) article to learn the most vulnerable points of the component and the measures you can take to improve the safety of your application.
