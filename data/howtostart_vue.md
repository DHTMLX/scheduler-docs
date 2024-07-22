dhtmlxScheduler with Vue.js
============================

You should be familiar with the basic concepts and patterns of [Vue](https://vuejs.org/) to use this documentation.
If you are not, please refer to the [Vue 3 documentation](https://vuejs.org/guide/introduction.html#getting-started) for a getting-started tutorial.

DHTMLX Scheduler is compatible with Vue. We have prepared code examples of how to use DHTMLX Scheduler with Vue. 
To check online samples, please refer to the corresponding [Example on Replit](https://replit.com/@dhtmlx/dhtmlx-scheduler-with-vue3).

You can also [check the demo on GitHub](https://github.com/DHTMLX/vue-scheduler-demo).

## Creating a project

Before you start to create a new project, install [Node.js](https://nodejs.org/en/).

To create a Vue project, run the following command:

~~~
npm create vue@latest
~~~ 

This command will install and execute **create-vue**, the official Vue project scaffolding tool. Check the details in the 
[Vue.js Quick Start](https://vuejs.org/guide/quick-start.html#creating-a-vue-application).

### Installation of dependencies

Next you should go to the app directory. Let's name our project **scheduler-vue** and run:

~~~
cd scheduler-vue
~~~

After that you should install dependencies and start the dev server. For this, you need to make use of a package manager:

- if you use **yarn**, you need to call the following commands:

~~~
yarn install
yarn dev
~~~

- if you use **npm**, you need to call the following commands:

~~~
npm install
npm run dev
~~~

You should now have your Vue project running on [http://localhost:5173](http://localhost:5173).

![Scheduler Vue.js app running](frontend_frameworks_howtostart/scheduler_vue_app_run.png)

## Creating Scheduler

Now we should get the DHTMLX Scheduler code. Firstly, we need to stop the app by pressing **Ctrl+C** in 
the command line. Then we can proceed with installing the Scheduler package.


## Step 1. Package installation

There are two options available: you can install the **Pro** package from a local folder, or install the **trial**
version using **npm** or **yarn**.

### Installing the package from a local folder

The instructions are the following:

1\. Copy the Scheduler package into some local directory inside the project

2\. In the project directory run the command below replacing *scheduler-local-package-path* with the actual path:

~~~
npm install ./scheduler-local-package-path
//or
yarn add "./scheduler-local-package-path"
~~~

For example:

~~~
npm install ./scheduler_7.0.0_enterprise
// or
yarn add "./scheduler_7.0.0_enterprise"
~~~

### Installing the trial version via a package manager

To install the trial version of the Scheduler, you need to create a file with the *.npmrc* type and add the **&#64;dhx:registry=https://npm.dhtmlx.com/** string into it.

After that, you can install the trial version of Scheduler using **npm** or **yarn** commands:

- for npm:

~~~
npm install @dhx/trial-scheduler
~~~

- for yarn:

~~~
yarn add @dhx/trial-scheduler
~~~

To get Scheduler under the proprietary license, refer to the [Support Center](https://dhtmlx.com/docs/technical-support.shtml)!

## Step 2. Component creation

Now we should create a Vue component, to add a Scheduler into the application. Let's create a new 
file in the ***src/components/*** directory and name it ***Scheduler.vue***.

### Importing source files

Open the newly created ***Scheduler.vue*** file and import Scheduler source files. Note that:

- if you've installed the Scheduler package from a local folder, your import paths will look like this:

{{snippet Scheduler.vue}}
~~~
import { Scheduler } from "dhtmlx-scheduler";
…
<style>
  @import "@dhtmlx-scheduler/codebase/dhtmlxscheduler.css";
</style>
~~~

- if you've chosen to install the trial version, the import paths should be as in:

{{snippet Scheduler.vue}}
~~~
import { Scheduler } from "@dhx/trial-scheduler";
…
<style>
  @import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
</style>
~~~

In this tutorial we will use the **trial** version of Scheduler.

### Setting the container and adding Scheduler

To display Scheduler on the page, we need to set the container to render the component inside. Check the code below:

{{snippet Scheduler.vue}}
~~~html
<script>
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

export default {
  mounted() {
    let scheduler = Scheduler.getSchedulerInstance();
    let date = scheduler.init(this.$refs.cont, new Date(2023, 9, 6), "week");
    this.scheduler = scheduler;
  },
  unmounted() {
    this.scheduler.destructor();
    this.$refs.cont.innerHTML = "";
  },
};
</script>

<template>
  <div ref="cont" style="width: 100%; height: 100vh"></div>
</template>
~~~

To make the Scheduler container occupy the entire space of the body, you need to remove the default 
styles from the ***main.css*** file located in the ***src/assets*** folder and add the following one:

{{snippet src/assets/main.css}}
~~~css
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## Step 3. Adding Scheduler into the app

Now it's time to add the component into our app. Open ***src/App.vue*** and use the Scheduler component 
instead of the default content by inserting the code below:

{{snippet src/App.vue}}
~~~html
<script>
import Scheduler from "./components/Scheduler.vue";

export default {
  components: { Scheduler },
};
</script>

<template>
  <Scheduler/>
</template>
~~~

After that, when we start the app, we should see an empty Scheduler on a page:

![Scheduler Vue init](frontend_frameworks_howtostart/scheduler_init.png)

## Step 4. Providing Data

To add data into the Scheduler, we need to provide a data set. Let's create the ***data.js*** file in the ***src/*** directory and add some data into it:

{{snippet src/data.js}}
~~~js
export function getData() {
    const data = [
        {
			start_date: "2024-06-10 6:00",
			end_date: "2024-06-10 8:00",
			text: "Event 1",
			id: 1,
        },
        {
			start_date: "2024-06-13 10:00",
			end_date: "2024-06-13 18:00",
			text: "Event 2",
			id: 2,
        },
    ];
    return data;
}
~~~

We should [pass props (our data)](https://vuejs.org/guide/components/props.html) to a Scheduler component in ***App.vue***:

{{snippet App.vue}}
~~~html
<script>
import Scheduler from "./components/Scheduler.vue";
import { getData } from "./data";

export default {
  components: { Scheduler },
  data() {
    return {
      events: getData(),
    };
  },
};
</script>

<template>
  <Scheduler :events="events" />
</template>
~~~

And then use props in the **scheduler.parse()** method in the Scheduler component:

{{snippet Scheduler.vue}}
~~~html
<script>
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

export default {
  props: ["events"],
  mounted() {
    let scheduler = Scheduler.getSchedulerInstance();
    let date = scheduler.init(this.$refs.cont, new Date(2023, 5, 10), "week");
    scheduler.parse(this.events);

    this.scheduler = scheduler;
  },
  unmounted() {
    this.scheduler.destructor();
    this.$refs.cont.innerHTML = "";
  },
};
</script>

<template>
  <div ref="cont" style="width: 100%; height: 100vh"></div>
</template>
~~~

Now, if you reopen the app page, you should see a Scheduler with events:

![Scheduler Vue events](frontend_frameworks_howtostart/scheduler_events.png)

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
your Promise returns an object with **{id: databaseId}** or **{tid: databaseId}** as a result, so 
Scheduler could apply the new database id to the record. Get [more information about the server side](server_integration.md).

Well, Vue Scheduler is ready, you are welcome to [check out the full demo on GitHub](https://github.com/DHTMLX/vue-scheduler-demo).


## XSS, CSRF and SQL Injection Attacks

Pay attention that Scheduler doesn't provide any means of preventing an application from various threats, such as SQL injections or 
XSS and CSRF attacks. It is important that responsibility for keeping an application safe is on the developers implementing the backend.

Check the [Application Security](app_security.md) article to learn the most vulnerable points of the component and the measures you can take to improve the safety of your application.

