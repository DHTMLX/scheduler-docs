dhtmlxScheduler with React
============================

You should be familiar with the basic concepts and patterns of [React](https://react.dev/) to use this documentation.
If you are not, please refer to the [React documentation](https://legacy.reactjs.org/docs/getting-started.html) for a getting-started tutorial.

DHTMLX Scheduler is compatible with React. We have prepared code examples of how to use DHTMLX Scheduler with React. 
To check online samples, please refer to the corresponding [Example on Replit](https://replit.com/@dhtmlx/dhtmlx-scheduler-with-react). 

You can also [check the demo on GitHub](https://github.com/DHTMLX/react-scheduler-demo).

## Creating a project

Before you start to create a new project, install [Node.js](https://nodejs.org/en/).

You can create a basic React project using the following command:

~~~
npx create-vite my-react-scheduler-app --template react
~~~

### Installation of dependencies

Next you should go to the app directory. Let's call our project **my-react-scheduler-app** and run:

~~~
cd my-react-scheduler-app
~~~

After that you should install dependencies and start the dev server. For this, you need to make use of a package manager:

- if you use yarn, you need to call the following commands:

~~~
yarn install
yarn dev
~~~

- if you use npm, you need to call the following commands:

~~~
npm install
npm run dev
~~~

You should now have your React project running on **http://localhost:5173**.

![Scheduler React app running](frontend_frameworks_howtostart/scheduler_react_app_run.png)

## Creating Scheduler

Now we should get the DHTMLX Scheduler code. Firstly, we need to stop the app by pressing **Ctrl+C** 
in the command line. Then we can proceed with installing the Scheduler package.

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
// or
yarn add "./scheduler_7.0.0_enterprise"
~~~

### Installing the trial version via a package manager

To install the trial version of the Scheduler, you need to create a file with the type `.npmrc` and add the following string: **&#64;dhx:registry=https://npm.dhtmlx.com/**.

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

Now we should create a React component, to add a Scheduler into the application. Let's create the ***src/components/Scheduler*** folder. 
Here we'll create the ***Scheduler.jsx***, ***Scheduler.css*** and ***index.js*** files.

We need to create the ***Scheduler.css*** file and add styles for the *scheduler-container*:

{{snippet src/components/Scheduler/Scheduler.css}}
~~~
.scheduler-container {
    height: 100vh;
    width: 100vw;
}
~~~

To make the Scheduler container occupy the entire space of the body, you need to remove the default styles from the ***App.css*** file 
located in the ***src*** folder and add the following one:

~~~
#root {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

And add the ***index.js*** file with the following content:

{{snippet src/components/Scheduler/index.js }}
~~~
import Scheduler from './Scheduler';
import './Scheduler.css';
export default Scheduler;
~~~

### Importing source files

Open the newly created  ***Scheduler.jsx*** file and import Scheduler source files. Note that:

- if you've installed the Scheduler package from a local folder, your import paths will look like this:

{{snippet Scheduler.jsx}}
~~~
import { Scheduler } from 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';
~~~

- if you've chosen to install the trial version, the import paths should be as in:

{{snippet Scheduler.jsx}}
~~~
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';
~~~

In this tutorial we will use the **trial** version of Scheduler.

### Setting the container and adding Scheduler

To display Scheduler on the page, we need to set the container to render the component inside. Create the ***Scheduler.jsx*** file with the following code:

{{snippet src/components/Scheduler/Scheduler.jsx}}
~~~
import { useEffect, useRef } from "react";
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

export default function SchedulerView( ) {
    let container = useRef();
    useEffect(() => {
        let scheduler = Scheduler.getSchedulerInstance();
        scheduler.skin = "terrace";
        scheduler.config.header = [
            "day",
            "week",
            "month",
            "date",
            "prev",
            "today",
            "next",
        ];

        scheduler.init(container.current, new Date(2024, 5, 10));
        return () => {
            scheduler.destructor();
            container.current.innerHTML = "";
        };
    }, []);

    return (
        <div ref={container} style={{ width: "100%", height: "100%" }}></div>
    );
}
~~~

## Step 3. Adding Scheduler into the app

Now it's time to add the component into our app. Open ***src/app.jsx*** and use *SchedulerComponent* instead of the default content by inserting the code below:

{{snippet src/App.jsx}}
~~~
import Scheduler from "./components/Scheduler";
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

![Scheduler React init](frontend_frameworks_howtostart/scheduler_init.png)

## Step 4. Providing Data

To add data into the Scheduler, we need to provide a data set. Let's create the ***data.js*** file in the ***src/*** directory and add some data into it:

{{snippet src/data.js}}
~~~
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

And we should [pass props (our data)](https://react.dev/learn/passing-props-to-a-component) to a Scheduler component in ***App.jsx***:

{{snippet App.jsx}}
~~~
import { getData } from "./data.js";
import Scheduler from "./components/Scheduler";
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

~~~
import { useEffect, useRef } from "react";
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

export default function SchedulerView({events}) {
    let container = useRef();
    useEffect(() => {
        let scheduler = Scheduler.getSchedulerInstance();
        scheduler.skin = "terrace";
        scheduler.config.header = [
            "day",
            "week",
            "month",
            "date",
            "prev",
            "today",
            "next",
        ];

        scheduler.init(container.current, new Date(2024, 5, 10));
        scheduler.parse(events);
        return () => {
            scheduler.destructor();
            container.current.innerHTML = "";
        };
    }, []);

    return (
        <div ref={container} style={{ width: "100%", height: "100%" }}></div>
    );
}
~~~

Now, if you reopen the app page, you should see a Scheduler with events:

![Scheduler React events](frontend_frameworks_howtostart/scheduler_events.png)

## Step 5. Saving Data

To capture changes made in the Scheduler, you can use the [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html) handler that lets you to 
"communicate" with th eserver-side backend. The handler can be declared either as a function or as a router object.
Scheduler accepts a Promise response from the handler, so the scheduler will correctly process the completion of an action. 

You can create a **DataProcessor** via the **createDataProcessor()** API method and capture changes like this:

~~~
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

If your service changes th eevent id after creating a new record (which it usually does), make sure that 
your Promise returns an object with **{id: databaseId}** or **{tid: databaseId}** as a result, so 
Scheduler could apply the new database id to the record. Get [more information about server side](server_integration.md).

Well, React Scheduler is ready, you are welcome to [check out the full demo on GitHub](https://github.com/DHTMLX/react-scheduler-demo).

## XSS, CSRF and SQL Injection Attacks

Pay attention that Scheduler doesn't provide any means of preventing an application from various threats, such as SQL injections or 
XSS and CSRF attacks. It is important that responsibility for keeping an application safe is on the developers implementing the backend.

Check the [Application Security](app_security.md) article to learn the most vulnerable points of the component and the measures you can take to improve the safety of your application.


