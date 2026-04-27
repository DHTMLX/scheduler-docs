---
title: "Firebase-Integration"
sidebar_label: "Firebase-Integration"
---

# Firebase-Integration

In diesem Tutorial lernen Sie, wie Sie einen Echtzeit-Ereignisplaner erstellen, indem Sie den DHTMLX Scheduler mit [Firebase Firestore](https://firebase.google.com/products/firestore) integrieren. Diese Integration sorgt für eine nahtlose Synchronisierung der Ereignisdaten zwischen der Scheduler-Oberfläche und der Firestore-Datenbank: Alle Aktualisierungen erfolgen live, über alle verbundenen Clients hinweg.

Sie können das entsprechende Beispiel auf GitHub ansehen: [DHTMLX Scheduler mit Firebase Firestore Demo](https://github.com/DHTMLX/firebase-scheduler-demo).

## Schritt 1: Projekt einrichten

Lassen Sie uns zunächst ein neues Projektverzeichnis erstellen und ein frisches Frontend-Projekt mit [Vite](https://vite.dev/) initialisieren:

~~~js
mkdir scheduler-firebase-demo
cd scheduler-firebase-demo
npm create vite@latest . -- --template vanilla
~~~

Nachdem Vite das Projekt eingerichtet hat, löschen Sie den `src`-Ordner, um neu zu beginnen:

~~~js
rm -rf src/*
~~~

Nun installieren Sie die benötigten Abhängigkeiten:

~~~js
npm i dhtmlx-scheduler firebase
~~~

## Schritt 2: Firebase-Projekt erstellen und konfigurieren

Erstellen Sie zunächst ein Firebase-Projekt, indem Sie die folgenden Schritte ausführen:

- gehen Sie zur Firebase Console
- klicken Sie auf **Projekt erstellen**
- geben Sie den Projektnamen ein (z. B. `scheduler-firebase-demo`) und folgen Sie den Einrichtungshinweisen


Dann richten Sie Firestore ein, indem Sie die folgenden Schritte abschließen:

- navigieren Sie zu **Firestore-Datenbank** in Ihrem Firebase-Projekt-Dashboard 
- klicken Sie auf **Datenbank erstellen**
- wählen Sie Ihren bevorzugten Standort
- starten Sie im **Testmodus** zur Erleichterung der Entwicklung (denken Sie daran, die Sicherheitsregeln vor der Produktion zu konfigurieren)
- klicken Sie auf **Erstellen**


Anschließend registrieren Sie Ihre Web-App wie folgt:

- wählen Sie **Projektübersicht** in der Firebase Console-Seitenleiste
- klicken Sie auf das Web-App-Symbol `</>`, um eine neue Web-App zu registrieren
- geben Sie den App-Spitznamen ein (z. B. `scheduler-firebase-demo`)
- aktivieren Sie Firebase Hosting
- klicken Sie auf **App registrieren**
- kopieren Sie die generierte Firebase-Konfiguration (Sie werden sie in Ihrem Projekt verwenden)

Schließlich konfigurieren Sie Firebase in Ihrem Projekt wie unten beschrieben:

- erstellen Sie eine neue Datei `src/firebase.js` und fügen Sie Ihre Firebase-Konfiguration ein, initialisieren Sie Firebase und Firestore:


~~~js title="src/firebase.js"
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

:::note
Ersetzen Sie alle Platzhalterwerte (wie `YOUR_API_KEY` usw.) durch Ihre tatsächlichen Firebase-Projektdaten.
:::

- installieren Sie die Firebase CLI global (für Deployment und lokale Emulation) wie folgt:

~~~js
npm i -g firebase-tools
~~~

## Schritt 3: DHTMLX Scheduler mit Firestore integrieren

Zu Beginn bereiten Sie den HTML-Container vor. Ersetzen Sie den Inhalt von `index.html` durch Folgendes:

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width="device-width," initial-scale="1.0"" />
    <title>Scheduler Firebase demo</title>
  </head>
  <body>
    <div id="scheduler_here" class="dhx_cal_container" 
      style='width:100%; height: 800px;'></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
~~~

Dann legen Sie die Haupt-Logik in der Datei `src/main.js` fest, indem Sie den untenstehenden Code verwenden. Er verbindet die Scheduler-Oberfläche mit Firestore und verarbeitet Echtzeit-Updates.

~~~js title="src/main.js"
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

Dieser Code integriert die DHTMLX Scheduler-Bibliothek mit Firebase Firestore, um in einer JavaScript-Anwendung einen Echtzeit-Interaktionskalender zu erstellen. Er synchronisiert Ereignisdaten zwischen der Scheduler-Oberfläche und einer Firestore-Datenbank, sodass Änderungen in beiden sofort in der anderen sichtbar sind. Der Code unterstützt das Erstellen, Aktualisieren, Löschen und wiederkehrende Ereignisse und nutzt die Echtzeit-Fähigkeiten von Firestore.

### Zusammenfassung der wichtigsten Funktionen

- **scheduler.createDataProcessor**: Führt CRUD-Operationen für Scheduler-Ereignisse aus und synchronisiert sie mit Firestore:

    - Bei **"create"** wird ein neues Dokument in der Sammlung "events" hinzugefügt.
    - Bei **"update"** wird das entsprechende Firestore-Dokument aktualisiert.
    - Bei **"delete"** wird das Dokument aus Firestore entfernt.

- **processEvent(docSnapshot)**: wandelt ein Firestore-Dokumenten-Snapshot in ein Scheduler-Ereignisobjekt um und hängt die ID des Dokuments an.

- **(...)() IIFE** : die anfängliche Datenladung. Lädt alle vorhandenen Ereignisse aus Firestore in den Scheduler, wenn die Seite geladen wird, und beginnt dann mit dem Empfang von Echtzeit-Updates.

- **watchRealtime**: verwendet Firestore's `onSnapshot`, um Änderungen in der Sammlung "events" in Echtzeit zu überwachen und die Scheduler-Oberfläche in Echtzeit zu aktualisieren. Wichtige Punkte:
  
  - ignoriert den anfänglichen Snapshot (bereits geladen)
  - verarbeitet nur serverseitige Änderungen (ignoriert lokale, noch nicht bestätigte Writes)
  - behandelt hinzugefügte, geänderte und entfernte Ereignisse, indem es `remoteUpdates` aufruft

- **onSnapshot(q, callback)**: hört in Echtzeit auf Änderungen in der Firestore-Sammlung "events", sortiert nach "text" absteigend, und wendet die entsprechenden Live-Updates auf die Scheduler-Oberfläche an, wobei `remoteUpdates.events` für hinzugefügte, geänderte oder entfernte Ereignisse verwendet wird.

## Schritt 4: Projekt initialisieren und bereitstellen

Nun müssen Sie Firebase Hosting und Firestore initialisieren. Dazu sollten Sie:

1. Vom Projektstamm führen Sie folgenden Befehl aus:

~~~js
firebase init
~~~

Führen Sie anschließend die folgenden Schritte aus:

- verwenden Sie die **Leertaste**, um die Features **Firestore** und **Hosting** auszuwählen
- wählen Sie **Use an existing project** und wählen Sie Ihr Firebase-Projekt
- akzeptieren Sie für Firestore-Regeln, Indizes und das öffentliche Verzeichnis die Standards
- **setzen Sie das öffentliche Verzeichnis auf `dist` (die Vite-Build-Ausgabe)**
- überspringen Sie die GitHub-Deploy-Einrichtung, es sei denn, Sie möchten sie konfigurieren

2. Bauen Sie Ihr Projekt, indem Sie den folgenden Befehl ausführen:

~~~js
npm run build
~~~

3. Stellen Sie auf dem Firebase Hosting mit folgendem Befehl bereit:

~~~js
firebase deploy
~~~

Nach Abschluss der Bereitstellung wird Ihre Hosting-URL in der Konsole angezeigt.