--- 
title: React Scheduler und Firebase-Integration
sidebar_label: Firebase Schnellstart
description: "Bauen Sie einen Echtzeit-kollaborativen React Scheduler, der über Firebase Firestore synchronisiert wird."
---

# React Scheduler und Firebase-Integration

Dieses Tutorial zeigt, wie man **React Scheduler** mit **Firebase Firestore** für die Echtzeit-Synchronisation mehrerer Benutzer verbindet.

Sie werden bauen:

- eine Scheduler-Seite, basierend auf React-State (`events`)
- Firestore-Listener für Live-Updates
- eine `data.save`-Bridge für Erstellen/Aktualisieren/Löschen

## Schritt 1. Projekt erstellen

```bash
npm create vite@latest react-scheduler-firebase -- --template react-ts
cd react-scheduler-firebase
npm install firebase
```

Installieren Sie React Scheduler wie beschrieben in der [React Scheduler Installationsanleitung](integrations/react/installation.md).

Für Evaluation:

```bash
npm install @dhtmlx/trial-react-scheduler
```

Für das Profi-Paket ersetzen Sie die Trial-Imports durch `@dhx/react-scheduler`.

## Schritt 2. Firebase konfigurieren

In der Firebase-Konsole:

1. Ein Projekt erstellen.
2. Die Firestore-Datenbank aktivieren.
3. Eine Web-App registrieren und die Firebase-Konfiguration kopieren.

Füge `.env` hinzu:

```env
VITE_FIREBASE_CONFIGURATION={"apiKey":"YOUR_API_KEY","authDomain":"YOUR_AUTH_DOMAIN","projectId":"YOUR_PROJECT_ID","storageBucket":"YOUR_STORAGE_BUCKET","messagingSenderId":"YOUR_MESSAGING_SENDER_ID","appId":"YOUR_APP_ID"}
```

Erstelle `src/firebase.ts`:

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

## Schritt 3. Seed und Typen vorbereiten

Erstelle `src/seed/data.ts`:

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

## Schritt 4. Scheduler rendern und Events laden

Erstelle `src/components/Scheduler.tsx`:

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

## Schritt 5. In der App einbinden

Ersetze `src/App.tsx`:

```tsx
import SchedulerWithFirebase from "./components/Scheduler";

export default function App() {
  return <SchedulerWithFirebase />;
}
```

## Hinweise zur Synchronisation

- Firestore `onSnapshot` hält alle verbundenen Clients synchron.
- Die Rückgabe von `{ id: created.id }` in `data.save` sorgt dafür, dass Scheduler temporäre IDs durch Firestore-Dokument-IDs ersetzt.
- Halten Sie Sicherheitsregeln vor dem Produktionseinsatz streng.

## Verwandte Seiten

- [Datenbindung & Grundlagen der Zustandsverwaltung](integrations/react/state/state-management-basics.md)
- [React Scheduler Überblick](integrations/react/overview.md#bindingdata)
- [Server-Integration](guides/server-integration.md)