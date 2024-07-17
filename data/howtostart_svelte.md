dhtmlxScheduler with Svelte
===========================

You should be familiar with the basic concepts and patterns of Svelte to use this documentation. If 
you are not, please refer to the [Svelte documentation](https://svelte.dev/) for a getting-started tutorial.

DHTMLX Scheduler is compatible with Svelte. We have prepared code examples of how to use 
DHTMLX Scheduler with Svelte. To check online samples, please refer to the corresponding [Example on Replit](https://replit.com/@dhtmlx/dhtmlx-scheduler-with-svelte).

You can also [check the demo on GitHub](https://github.com/DHTMLX/svelte-scheduler-demo).

## Creating a project

Before you start to create a new project, install [Vite](https://vitejs.dev/) (optional) and [Node.js](https://nodejs.org/en/).

To create a Svelte project we will use Svelte with Vite and run the following command:

~~~
npm create vite@latest
~~~

Check the details in the [related article](https://svelte.dev/docs/introduction#start-a-new-project-alternatives-to-sveltekit).

### Installation of dependencies

Next you should go to the app directory. Let's name our project **scheduler-svelte** and choose the **svelte** option, then run:

~~~
cd scheduler-svelte
~~~

After that you should install dependencies and run the app. For this, you need to make use of a package manager:

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

You should now have your Svelte project running on [http://localhost:5173](http://localhost:5173).

![Scheduler Svelte app running](frontend_frameworks_howtostart/scheduler_svelte_app_run.png)

## Creating Scheduler

Now we should get the DHTMLX Scheduler code. Firstly, we need to stop the app by pressing **Ctrl+C** in the command line.
Then we can proceed with installing the Scheduler package.

## Step 1. Package installation

There are two options available: you can install the **Pro** package from a local folder, or install the **trial** version using **npm** or **yarn**.

### Installing the package from a local folder

The instructions are the following:

1\. Copy the Scheduler package into some local directory inside the project

2\. In the project directory run the command below replacing *scheduler-local-package-path* with the actual path:

~~~
npm install ./scheduler-local-package-path
// or
yarn add "./scheduler-local-package-path"
~~~

For example:

~~~
npm install ./scheduler_7.0.0_enterprise
//or
yarn add "./scheduler_7.0.0_enterprise"
~~~

### Installing the trial version via a package manager

To install the trial version of the Scheduler, you need to create a file with the *.npmrc* type and add the string **&#64;dhx:registry=https://npm.dhtmlx.com/** into it.

After that, you can install the **trial** version of Scheduler using **npm** or **yarn** commands:

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

Now we should create a Svelte component, to add a Scheduler into the application. Let's create a new file in the ***/src*** directory and name it ***Scheduler.svelte***.

### Importing source files

Open the newly created  ***Scheduler.svelte*** file and import Scheduler source files. Note that:

- if you've installed the Scheduler package from a local folder, your import paths will look like this:

{{snippet Scheduler.svelte}}
~~~
import { Scheduler } from "dhtmlx-scheduler";
import "dhtmlx-scheduler/codebase/dhtmlxscheduler.css";
~~~ 

- if you've chosen to install the trial version, the import paths should be as in:

{{snippet Scheduler.svelte}}
~~~
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
~~~

In this tutorial we will use the **trial** version of Scheduler.

### Setting the container and adding Scheduler

To display Scheduler on the page, we need to set the container to render the component inside. Check the code below:

{{snippet Scheduler.svelte}}
~~~html
<script>
    import { onMount } from "svelte";
    import { Scheduler } from "@dhx/trial-scheduler";
    import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

    let scheduler;
    let container;
    onMount(() => {
        scheduler = Scheduler.getSchedulerInstance();
        scheduler.skin = "terrace";
        scheduler.init(container, new Date(2023, 9, 6), "week");

        return () => scheduler.destructor();
    });
</script>

<div bind:this={container} style="width: 100%; height: 100vh;"></div>
~~~

To make the Scheduler container occupy the entire space of the body, you need to remove the default 
styles from the ***app.css*** file located in the ***/src*** folder and add the following one:

{{snippet src/app.css}}
~~~css
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## Step 3. Adding Scheduler into the app

Now it's time to add the component into our app. Open ***src/App.svelte*** and use the *Scheduler* component instead of the default content by inserting the code below:

{{snippet App.svelte}}
~~~html
<script>
  import Scheduler from "./Scheduler.svelte";
</script>

<Scheduler/>
~~~

After that, when we start the app, we should see an empty Scheduler on a page:

![Scheduler Svelte init](frontend_frameworks_howtostart/scheduler_init.png)

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

And we should [pass props (our data)](https://learn.svelte.dev/tutorial/declaring-props) to a Scheduler component in ***App.svelte***:

{{snippet App.svelte}}
~~~html
<script>
  import Scheduler from "./Scheduler.svelte";
  import { getData } from "./data.js";
</script>

<Scheduler data={getData()} />
~~~

And use props in the **scheduler.parse()** method in the Scheduler component:

{{snippet Scheduler.svelte}}
~~~html
<script>
    import { onMount } from "svelte";
    
    import { Scheduler } from "@dhx/trial-scheduler";
    import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css"
    export let data; /*!*/

    let scheduler;
    let container;
    onMount(() => {
        scheduler = Scheduler.getSchedulerInstance();
        scheduler.skin = "terrace"
        scheduler.init(container, new Date(2024, 5, 10), "week");

        return () => scheduler.destructor();
    });

    $: scheduler?.parse(data); /*!*/
</script>

<div bind:this={container} style="width: 100%; height: 100vh;"></div>
~~~

Now, if you reopen the app page, you should see a Scheduler with events:

![Scheduler Svelte events](frontend_frameworks_howtostart/scheduler_events.png)

## Step 5. Saving Data

To capture changes made in the Scheduler, you can use the [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html) handler that lets you  
"communicate" with the server-side backend. The handler can be declared either as a function or as a router object.
Scheduler accepts a Promise response from the handler, so Scheduler will correctly process the completion of an action. 

You can create a **DataProcessor** via the **createDataProcessor()** API method and capture changes like this:

~~~js
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

If your service changes the event id after creating a new record (which it usually does), make sure that 
your Promise returns an object with **{id: databaseId}** or **{tid: databaseId}** as a result, so 
Scheduler could apply the new database id to the record. Get [more information about the server side](server_integration.md).

Well, Svelte Scheduler is ready, you are welcome to [check out the full demo on GitHub](https://github.com/DHTMLX/svelte-scheduler-demo).


## XSS, CSRF and SQL Injection Attacks

Pay attention that Scheduler doesn't provide any means of preventing an application from various threats, such as SQL injections or 
XSS and CSRF attacks. It is important that responsibility for keeping an application safe is on the developers implementing the backend.

Check the [Application Security](app_security.md) article to learn the most vulnerable points of the component and the measures you can take to improve the safety of your application.