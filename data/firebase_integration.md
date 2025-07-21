Firebase Integration
===================

In this tutorial, you will learn how to build a real-time event scheduler by integrating DHTMLX Scheduler with [Firebase Firestore](https://firebase.google.com/products/firestore). This integration provides seamless synchronization of event data between the Scheduler UI and the Firestore database: all updates happen live, across all the connected clients.

You can check the corresponding example on GitHub: [DHTMLX Scheduler with Firebase Firestore Demo](https://github.com/DHTMLX/firebase-scheduler-demo).

## Step 1: Project setup

Let's start by creating a new project directory and initializing a fresh frontend project using [Vite](https://vite.dev/):

~~~js
mkdir scheduler-firebase-demo
cd scheduler-firebase-demo
npm create vite@latest . -- --template vanilla
~~~

After Vite has set up the project, clear the `src` folder to start fresh:

~~~js
rm -rf src/*
~~~

Now, install the necessary dependencies:

~~~js
npm i dhtmlx-scheduler firebase
~~~

## Step 2: Create and configure Firebase project

First, create a Firebase project by implementing the following steps:

- go to the Firebase Console
- click **Create a project**
- enter the project name (e.g., `scheduler-firebase-demo`) and follow the setup prompts


Then set up Firestore by completing the steps below:

- navigate to **Firestore Database** in your Firebase project dashboard 
- click **Create database**
- select your preferred location
- start in the **test mode** for ease during the development (remember to configure the security rules before production)
- click **Create**


After that, register your web app in the following way:

- select **Project Overview** in the Firebase Console sidebar
- click the web app icon `</>` to register a new web app
- provide the app nickname (e.g., `scheduler-firebase-demo`)
- enable Firebase Hosting
- click **Register app**
- copy the generated Firebase configuration (you'll use it in your project)

Finally, configure Firebase in your project as described below:

- create a new file `src/firebase.js` and paste your Firebase config, initializing Firebase and Firestore:

{{snippet path src/firebase.js}}
~~~js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "scheduler-firebase-demo.firebaseapp.com",
  projectId: "scheduler-firebase-demo",
  storageBucket: "scheduler-firebase-demo.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
~~~

{{note Replace all the placeholder values (such as `YOUR_API_KEY`, etc.) with your actual Firebase project credentials.}}

- install the Firebase CLI globally (for deployment and local emulation) as follows:

~~~js
npm i -g firebase-tools
~~~

## Step 3:  Integrate DHTMLX Scheduler with Firestore

To begin with, prepare your HTML container. Replace your `index.html` content with the following:

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Scheduler Firebase demo</title>
  </head>
  <body>
    <div id="scheduler_here" class="dhx_cal_container" 
      style='width:100%; height: 800px;'></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
~~~

Then, specify the main JavaScript logic by creating the `src/main.js` file with the code provided below. 
It connects the Scheduler UI with Firestore and handles real-time updates.

{{snippet path src/main.js}}
~~~js
import { scheduler } from "dhtmlx-scheduler";
import { db } from "./firebase.js";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  deleteDoc,
  orderBy,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";

import "dhtmlx-scheduler/codebase/dhtmlxscheduler.css";

const { remoteUpdates } = scheduler.ext.liveUpdates;

scheduler.plugins({
  recurring: true,
});

scheduler.config.header = [
  "day",
  "week",
  "month",
  "date",
  "prev",
  "today",
  "next",
];

scheduler.init("scheduler_here", new Date(2025, 3, 20), "week");

const eventsRef = collection(db, "events");

scheduler.createDataProcessor(async function (entity, action, ev, id) {
  switch (action) {
    case "create":
      {
        const createdDoc = await addDoc(eventsRef, ev);
        if (createdDoc.id) {
          return { action: "inserted", tid: createdDoc.id };
        }
      }
      break;
    case "update":
      {
        return updateDoc(doc(db, "events", id), ev);
      }
      break;
    case "delete":
      {
        const deletedDoc = await deleteDoc(doc(db, "events", id));
        if (deletedDoc) {
          return { action: "deleted" };
        }
      }
      break;
  }
});

// helper functions to process event data
const processEvent = (docSnapshot) => {
  const event = docSnapshot.data();
  event.id = docSnapshot.id;
  return event;
};

// without it collection wouldn't call onSnapshot
const eventsQuery = query(eventsRef, orderBy("text", "desc")); 

(async () => {
  const EventsSnap = await getDocs(eventsQuery);
  const bulkEvents = EventsSnap.docs.map((ev) => processEvent(ev));
  scheduler.parse(bulkEvents);
  watchRealtime();
})();

const watchRealtime = () => {
  let EventsLoaded = false;

  onSnapshot(eventsQuery, (querySnapshot) => {
    if (!EventsLoaded) {
      // first snapshot sends the current state
      // we have already loaded it at the previous step
      EventsLoaded = true;
      return;
    }
    querySnapshot.docChanges().forEach((change) => {
      // processes only the server-side changes
      if (change.doc.metadata.hasPendingWrites) return;

      const event = processEvent(change.doc);

      switch (change.type) {
        case "added":
          remoteUpdates.events({ type: "add-event", event });
          break;
        case "modified":
          remoteUpdates.events({ type: "update-event", event });
          break;
        case "removed":
          remoteUpdates.events({ type: "delete-event", event });
          break;
      }
    });
  });
};
~~~

This code integrates the DHTMLX Scheduler library with Firebase Firestore to create a real-time, interactive event calendar in a JavaScript application. It synchronizes event data between the Scheduler UI and a Firestore database, ensuring that changes made in either of them are immediately reflected in the other. The code supports event creation, updates, deletions, and recurring events, leveraging Firestore's real-time capabilities.

### Summary of key functions

- **scheduler.createDataProcessor**: handles CRUD operations for Scheduler events by syncing them with Firestore:

	- On "create", adds a new document to the "events" collection.
	- On "update", updates the corresponding Firestore document.
	- On "delete", removes the document from Firestore.

- **processEvent(docSnapshot)**: converts a Firestore document snapshot into a Scheduler event object, attaching the document's ID.

- **(...)() IIFE** : the initial data loading. Loads all existing events from Firestore into the Scheduler when the page loads, then starts listening to real-time updates.

- **watchRealtime**: uses Firestore's `onSnapshot` to listen to the changes in the events collection and updates the Scheduler UI in real time. The key points are:

	- ignores the initial snapshot (already loaded)
	- only processes the server-side changes (ignores local, uncommitted writes)
	- handles added, modified, and removed events by calling the Scheduler's `remoteUpdates`

- **onSnapshot(q, callback)**: in real time listens to the changes in the Firestore "events" collection, ordered by "text" descending, and applies the corresponding live updates to the Scheduler UI using `remoteUpdates.events` for added, modified, or removed events.

## Step 4: Initialize and deploy the project

Now you need to initialize the Firebase Hosting and Firestore. For this, you should:

1\. From your project root, run the following command:

~~~js
firebase init
~~~

Then implement the steps given below:

- use the **spacebar** to select the **Firestore** and **Hosting** features
- choose **Use an existing project** and pick your Firebase project
- for Firestore rules, indexes, and public directory, accept the defaults
- **set the public directory to `dist` (the Vite build output)**
- skip the GitHub deploy setup unless you want to configure it

2\. Build your project by running the command below:

~~~js
npm run build
~~~

3\. Deploy to the Firebase Hosting with the following command:

~~~js
firebase deploy
~~~

When the deployment is done, your hosting URL will be displayed in the console.




