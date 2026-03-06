---
title: React Scheduler and Firebase Integration
sidebar_label: Firebase Quick Start
description: "Build a real-time collaborative React Scheduler synced via Firebase Firestore."
---

# React Scheduler and Firebase Integration

This tutorial shows how to connect **React Scheduler** to **Firebase Firestore** for real-time multi-user synchronization.

You will build:

- a Scheduler page backed by React state (`events`)
- Firestore listeners for live updates
- a `data.save` bridge for create/update/delete

## Step 1. Create the project

```bash
npm create vite@latest react-scheduler-firebase -- --template react-ts
cd react-scheduler-firebase
npm install firebase
```

Install React Scheduler as described in the [React Scheduler installation guide](integrations/react/installation.md).

For evaluation:

```bash
npm install @dhtmlx/trial-react-scheduler
```

For professional package, replace trial imports with `@dhx/react-scheduler`.

## Step 2. Configure Firebase

In Firebase Console:

1. Create a project.
2. Enable **Firestore Database**.
3. Register a Web app and copy Firebase config.

Add `.env`:

```env
VITE_FIREBASE_CONFIGURATION={"apiKey":"YOUR_API_KEY","authDomain":"YOUR_AUTH_DOMAIN","projectId":"YOUR_PROJECT_ID","storageBucket":"YOUR_STORAGE_BUCKET","messagingSenderId":"YOUR_MESSAGING_SENDER_ID","appId":"YOUR_APP_ID"}
```

Create `src/firebase.ts`:

```ts
import { initializeApp } from "firebase/app";
import { collection, getFirestore, query } from "firebase/firestore";

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIGURATION);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const eventsCollection = collection(db, "events");
const eventsQuery = query(eventsCollection);

export { db, eventsCollection, eventsQuery };
```

## Step 3. Prepare seed and types

Create `src/seed/data.ts`:

```ts
import type { Event as SchedulerEvent } from "@dhtmlx/trial-react-scheduler";

export const seedEvents: SchedulerEvent[] = [
  {
    id: "event_1",
    text: "Planning",
    start_date: "2025-12-08T09:00:00Z",
    end_date: "2025-12-08T10:00:00Z",
  },
  {
    id: "event_2",
    text: "Client call",
    start_date: "2025-12-08T11:00:00Z",
    end_date: "2025-12-08T12:00:00Z",
  },
];
```

## Step 4. Render Scheduler and load events

Create `src/components/Scheduler.tsx`:

```tsx
import { useEffect, useMemo, useState } from "react";
import ReactScheduler, { type Event as SchedulerEvent } from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
  type QueryDocumentSnapshot,
  type QuerySnapshot,
} from "firebase/firestore";

import { db, eventsCollection, eventsQuery } from "../firebase";

const mapDoc = (snap: QueryDocumentSnapshot): SchedulerEvent => {
  const data = snap.data();
  return {
    ...data,
    id: snap.id,
  } as SchedulerEvent;
};

export default function SchedulerWithFirebase() {
  const [events, setEvents] = useState<SchedulerEvent[]>([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const initial = await getDocs(eventsQuery);
      if (!mounted) return;
      setEvents(initial.docs.map(mapDoc));
    })();

    const unsubscribe = onSnapshot(eventsQuery, (snapshot: QuerySnapshot) => {
      const nextEvents = snapshot.docs.map(mapDoc);
      setEvents(nextEvents);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const data = useMemo(
    () => ({
      save: async (
        entity: string,
        action: string,
        raw: SchedulerEvent,
        id: string | number
      ) => {
        if (entity !== "event") return;

        if (action === "create") {
          const created = await addDoc(eventsCollection, {
            ...raw,
            id: undefined,
          });

          return { id: created.id };
        }

        const targetId = String(raw?.id ?? id);
        const targetRef = doc(db, "events", targetId);

        if (action === "update") {
          await updateDoc(targetRef, { ...raw });
          return;
        }

        if (action === "delete") {
          await deleteDoc(targetRef);
        }
      },
    }),
    []
  );

  return (
    <div style={{ height: "100vh" }}>
      <ReactScheduler
        events={events}
        data={data}
      />
    </div>
  );
}
```

## Step 5. Mount it in the app

Replace `src/App.tsx`:

```tsx
import SchedulerWithFirebase from "./components/Scheduler";

export default function App() {
  return <SchedulerWithFirebase />;
}
```

## Notes on synchronization

- Firestore `onSnapshot` keeps all connected clients in sync.
- Returning `{ id: created.id }` in `data.save` ensures Scheduler replaces temporary IDs with Firestore document IDs.
- Keep security rules strict before production deployment.

## Related pages

- [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)
- [React Scheduler Overview](integrations/react/overview.md#bindingdata)
- [Server Integration](guides/server-integration.md)
