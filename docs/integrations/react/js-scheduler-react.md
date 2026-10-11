---
title: "dhtmlxScheduler with React"
sidebar_label: "dhtmlxScheduler with React"
---

# dhtmlxScheduler with React

You should be familiar with the basic concepts and patterns of [React](https://react.dev/) to use this documentation.
If you are not, please refer to the [React documentation](https://react.dev/learn) for a getting-started tutorial.

DHTMLX Scheduler is compatible with React. You can check the corresponding example on GitHub: [DHTMLX Scheduler with React Demo](https://github.com/DHTMLX/react-scheduler-demo).

## Creating a project

Before you start to create a new project, install [Node.js](https://nodejs.org/en/).

You can create a basic React project using the following command:

~~~bash
npm create vite@latest my-react-scheduler-app -- --template react-ts
~~~

### Installation of dependencies

Next you should go to the app directory. Let's call our project **my-react-scheduler-app** and run:

~~~bash
cd my-react-scheduler-app
~~~

After that you should install dependencies and start the dev server. For this, you need to make use of a package manager:

- if you use yarn, you need to call the following commands:

~~~bash
yarn
yarn dev
~~~

- if you use npm, you need to call the following commands:

~~~bash
npm install
npm run dev
~~~

You should now have your React project running on **http://localhost:5173**.

![Scheduler React app running](/img/scheduler_react_app_run.png)

## Creating Scheduler

Now we should get the DHTMLX Scheduler code. Firstly, we need to stop the app by pressing **Ctrl+C** 
in the command line. Then we can proceed with installing the Scheduler package.

## Step 1. Package installation

The PRO versions of the library are available for the **npm/yarn** install from our private repository, please follow 
[this instruction](guides/installation.md#npm---evaluation-and-pro-versions) to gain access to it.

After you've got the Evaluation version of the Scheduler, you can install it with the following commands:

- for npm:

~~~bash
npm install @dhx/trial-scheduler
~~~

- for yarn:

~~~bash
yarn add @dhx/trial-scheduler
~~~

Alternatively, since the zip-package of the library is structured as an **npm** module, you can 
[install it from a local folder](guides/installation.md#installing-the-package-from-a-local-folder).

## Step 2. Component creation

Now we should create a React component, to add a Scheduler into the application. Let's create the ***src/components/Scheduler*** folder. 
Here we'll create the ***Scheduler.tsx***, ***Scheduler.css*** and ***index.ts*** files.

We need to create the ***Scheduler.css*** file and add styles for the *scheduler-container*:


~~~css title="src/components/Scheduler/Scheduler.css"
.scheduler-container {
    height: 100vh;
    width: 100vw;
}
~~~

To make the Scheduler container occupy the entire space of the body, you need to remove the default styles from the ***App.css*** file 
located in the ***src*** folder and add the following one:

~~~css title="src/App.css"
#root, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}
~~~

And add the ***index.ts*** file with the following content:


~~~js title="src/components/Scheduler/index.ts"
import Scheduler from './Scheduler';
import './Scheduler.css';
export default Scheduler;
~~~

### Importing source files

Open the newly created ***Scheduler.tsx*** file and import Scheduler source files. Note that:

- if you've installed the Scheduler package from a local folder, your import paths will look like this:


~~~js title="Scheduler.tsx"
import { Scheduler } from 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';
~~~

- if you've chosen to install the trial version, the import paths should be as in:

~~~js title="Scheduler.tsx"
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';
~~~

In this tutorial we will use the **trial** version of Scheduler.

### Setting the container and adding Scheduler

To display Scheduler on the page, we need to set the container to render the component inside. Create the ***Scheduler.tsx*** file with the following code:

~~~js title="src/components/Scheduler/Scheduler.tsx"
import { useEffect, useRef } from "react";
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

export default function SchedulerComponent() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!containerRef.current) {
            return;
        }
        let scheduler = Scheduler.getSchedulerInstance();
        scheduler.config.header = [
            "day",
            "week",
            "month",
            "date",
            "prev",
            "today",
            "next",
        ];

        scheduler.init(containerRef.current, new Date(2027, 5, 10));
        return () => {
            scheduler.destructor();
            if (containerRef.current) {
                containerRef.current.innerHTML = "";
            }
        };
    }, []);

    return <div ref={containerRef} style={{ width: "100%", height: "100%" }}/>;
}
~~~

## Step 3. Adding Scheduler into the app

Now it's time to add the component into our app. Open ***src/App.tsx*** and use the *Scheduler* component instead of the default content by inserting the code below:

~~~js title="src/App.tsx"
import Scheduler from "./components/index";
import "./App.css";

function App() {
    return (
        <div className="scheduler-container">
            <Scheduler/>
        </div>
    );
}
export default App;
~~~

After that, when we start the app, we should see an empty Scheduler on a page:

![Scheduler React init](/img/scheduler_init.png)

## Step 4. Providing Data

Before adding data to the Scheduler, let's create types for scheduler events and props that Scheduler will receive:

~~~ts title="src/types.ts"
export interface SchedulerEvent {
    id: string | number;
    text?: string;
    start_date: string | Date;
    end_date: string | Date;
    [key: string]: unknown;
}

export interface SchedulerComponentProps {
    events: SchedulerEvent[];
}
~~~

To add data into the Scheduler, we need to provide a data set. Let's create the ***data.ts*** file in the ***src/*** directory and add some data into it:

~~~js title="src/data.ts"
import type { SchedulerEvent } from "./types";

export function getData(): SchedulerEvent[] {
    const initialEvents: SchedulerEvent[] = [
        {
            start_date: "2027-06-10 6:00",
            end_date: "2027-06-10 12:00",
            text: "Event 1",
            id: 1,
        },
        {
            start_date: "2027-06-13 10:00",
            end_date: "2027-06-13 18:00",
            text: "Event 2",
            id: 2,
        },
    ];
    return initialEvents;
}
~~~

And we should [pass props (our data)](https://react.dev/learn/passing-props-to-a-component) to a Scheduler component in ***App.tsx***:


~~~js title="App.tsx"
import { getData } from "./data.ts";
import Scheduler from "./components/index";
import "./App.css";

function App() {
    return (
        <div className="scheduler-container">
            <Scheduler events={getData()}/>
        </div>
    );
}

export default App;
~~~

And use props in the **scheduler.parse()** method in the Scheduler component:


~~~js title="Scheduler.jsx"
import { useEffect, useRef } from "react";
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
import type { SchedulerComponentProps } from "../types";

export default function SchedulerComponent({events} : SchedulerComponentProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!containerRef.current) {
          return;
        }
        let scheduler = Scheduler.getSchedulerInstance();
        scheduler.config.header = [
            "day",
            "week",
            "month",
            "date",
            "prev",
            "today",
            "next",
        ];

        scheduler.init(containerRef.current, new Date(2027, 5, 10));
        scheduler.parse(events);
        return () => {
            scheduler.destructor();
            if (containerRef.current) {
              containerRef.current.innerHTML = "";
            }
        };
    }, []);

    return <div ref={containerRef} style={{ width: "100%", height: "100%" }}/>;
}
~~~

Now, if you reopen the app page, you should see a Scheduler with events:

![Scheduler React events](/img/scheduler_events.png)

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

Well, React Scheduler is ready, you are welcome to [check out the full demo on GitHub](https://github.com/DHTMLX/react-scheduler-demo).

## XSS, CSRF and SQL Injection Attacks

Pay attention that Scheduler doesn't provide any means of preventing an application from various threats, such as SQL injections or 
XSS and CSRF attacks. It is important that responsibility for keeping an application safe is on the developers implementing the backend.

Check the [Application Security](guides/app-security.md) article to learn the most vulnerable points of the component and the measures you can take to improve the safety of your application.
