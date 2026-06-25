---
title: "dhtmlxScheduler mit React"
sidebar_label: "dhtmlxScheduler mit React"
---

# dhtmlxScheduler mit React

Sie sollten mit den grundlegenden Konzepten und Mustern von [React](https://react.dev/) vertraut sein, um diese Dokumentation zu verwenden. Wenn Sie das nicht tun, lesen Sie bitte die [React-Dokumentation](https://react.dev/learn) für eine erste Einstiegstutorial.

DHTMLX Scheduler ist mit React kompatibel. Sie können das entsprechende Beispiel auf GitHub prüfen: [DHTMLX Scheduler with React Demo](https://github.com/DHTMLX/react-scheduler-demo).

## Erstellung eines Projekts

Bevor Sie ein neues Projekt erstellen, installieren Sie [Node.js](https://nodejs.org/en/).

Sie können ein grundlegendes React-Projekt mit dem folgenden Befehl erstellen:

~~~
npx create-vite my-react-scheduler-app --template react
~~~

### Installation der Abhängigkeiten

Als Nächstes sollten Sie in das App-Verzeichnis wechseln. Nennen wir unser Projekt **my-react-scheduler-app** und führen folgende Befehle aus:

~~~
cd my-react-scheduler-app
~~~

Anschließend sollten Sie Abhängigkeiten installieren und den Entwicklungsserver starten. Dafür benötigen Sie einen Paketmanager:

- Wenn Sie yarn verwenden, führen Sie die folgenden Befehle aus:

~~~
yarn install
yarn dev
~~~

- Wenn Sie npm verwenden, führen Sie die folgenden Befehle aus:

~~~
npm install
npm run dev
~~~

Ihr React-Projekt sollte nun unter **http://localhost:5173** laufen.

![Scheduler React app running](/img/scheduler_react_app_run.png)

## Scheduler erstellen

Jetzt sollten wir den DHTMLX Scheduler-Code holen. Zunächst müssen Sie die Anwendung beenden, indem Sie **Ctrl+C** in der Kommandozeile drücken. Danach können wir mit der Installation des Scheduler-Pakets fortfahren.

## Schritt 1. Paketinstallation

Die PRO-Versionen der Bibliothek sind für die **npm/yarn**-Installation aus unserem privaten Repository verfügbar. Bitte folgen Sie 
[dieser Anleitung](guides/installation.md#npm---evaluation-and-pro versions), um Zugriff darauf zu erhalten.

Nachdem Sie die Evaluierungsversion des Schedulers erhalten haben, können Sie ihn mit den folgenden Befehlen installieren:

- für npm:

~~~
npm install @dhx/trial-scheduler
~~~

- für yarn:

~~~
yarn add @dhx/trial-scheduler
~~~

Alternativ, da das ZIP-Paket der Bibliothek als **npm**-Modul strukturiert ist, können Sie 
[aus einem lokalen Ordner installieren](guides/installation.md#installing-the-package-from-a-local-folder).

## Schritt 2. Erstellung der Komponente

Nun sollten wir eine React-Komponente erstellen, um einen Scheduler in die Anwendung einzubinden. Erstellen wir dazu den Ordner ***src/components/Scheduler***. 
Hier erstellen wir die Dateien ***Scheduler.jsx***, ***Scheduler.css*** und ***index.js***.

Wir müssen die ***Scheduler.css***-Datei erstellen und Stile für den *scheduler-container* hinzufügen:


~~~css title="src/components/Scheduler/Scheduler.css"
.scheduler-container {
    height: 100vh;
    width: 100vw;
}
~~~

Um den Scheduler-Container den gesamten Platz des Bodys einnehmen zu lassen, entfernen Sie die Standard-Stile aus der ***App.css***-Datei im ***src***Ordner und fügen Sie Folgendes hinzu:

~~~css
#root {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

Und fügen Sie die ***index.js***-Datei mit dem folgenden Inhalt hinzu:


~~~js title="src/components/Scheduler/index.js"
import Scheduler from './Scheduler';
import './Scheduler.css';
export default Scheduler;
~~~

### Importieren von Quelldateien

Öffnen Sie die neu erstellte ***Scheduler.jsx***-Datei und importieren Sie die Scheduler-Quelldateien. Beachten Sie, dass:

- Wenn Sie das Scheduler-Paket aus einem lokalen Ordner installiert haben, sehen Ihre Importpfade so aus:


~~~js title="Scheduler.jsx"
import { Scheduler } from 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';
~~~

- Falls Sie sich für die Installation der Trial-Version entschieden haben, sollten die Importpfade wie folgt aussehen:


~~~js title="Scheduler.jsx"
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';
~~~

In diesem Tutorial verwenden wir die **trial**-Version von Scheduler.

### Festlegen des Containers und Hinzufügen des Schedulers

Um Scheduler auf der Seite anzuzeigen, müssen wir den Container so festlegen, dass die Komponente darin gerendert wird. Erstellen Sie dazu die ***Scheduler.jsx***-Datei mit dem folgenden Code:

~~~js title="src/components/Scheduler/Scheduler.jsx"
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
        <div ref="{container}" style="{{" width: "100%", height: "100%" }}></div>
    );
}
~~~

## Schritt 3. Scheduler in die App einfügen

Jetzt ist es Zeit, die Komponente in unsere App einzufügen. Öffnen Sie ***src/App.jsx*** und verwenden Sie die *Scheduler*-Komponente statt des Standardinhalts, indem Sie den untenstehenden Code einfügen:

~~~js title="src/App.jsx"
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

Nachdem Sie die Anwendung gestartet haben, sollten Sie eine leere Scheduler-Seite sehen:

![Scheduler React init](/img/scheduler_init.png)

## Schritt 4. Bereitstellung von Daten

Um Daten in den Scheduler einzufügen, müssen Sie einen Datensatz bereitstellen. Erstellen wir dazu die Datei ***data.js*** im ***src/***-Verzeichnis und fügen dort Daten hinzu:


~~~js title="src/data.js"
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

Und wir sollten [Props übergeben (unsere Daten)](https://react.dev/learn/passing-props-to-a-component) an eine Scheduler-Komponente in ***App.jsx***:


~~~js title="App.jsx"
import { getData } from "./data.js";
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
    return (
        <div className="scheduler-container">
               <Scheduler events="{getData()}/">
        </div>
    );
}
export default App;
~~~

Und verwenden Sie Props in der **scheduler.parse()**-Methode in der Scheduler-Komponente:


~~~js title="Scheduler.jsx"
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
        <div ref="{container}" style="{{" width: "100%", height: "100%" }}></div>
    );
}
~~~

Jetzt, wenn Sie die App-Seite erneut öffnen, sollten Sie einen Scheduler mit Terminen sehen:

![Scheduler React events](/img/scheduler_events.png)

## Schritt 5. Speichern von Daten

Um Änderungen, die im Scheduler vorgenommen werden, zu erfassen, können Sie den [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html) Handler verwenden, der die Kommunikation mit dem serverseitigen Backend ermöglicht. Der Handler kann entweder als Funktion oder als Router-Objekt deklariert werden.
dhtmlxScheduler akzeptiert eine Promise-Antwort vom Handler, sodass Ihr Scheduler das Abschließen einer Aktion korrekt verarbeitet.

Sie können einen **DataProcessor** über die API-Methode **createDataProcessor()** erstellen und Änderungen so erfassen:

~~~
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

Wenn Ihr Service die Event-ID nach dem Erstellen eines neuen Datensatzes ändert (was normalerweise geschieht), stellen Sie sicher, dass Ihre Promise ein Objekt mit **(id: databaseId)** oder **(tid: databaseId)** als Ergebnis zurückgibt, damit Scheduler die neue Datenbank-ID dem Datensatz zuweisen kann. Erfahren Sie [mehr über die Serverseite](guides/server-integration.md).

Nun ist der React Scheduler bereit, Sie sind herzlich eingeladen, sich die vollständige Demo auf GitHub anzusehen: [check out the full demo on GitHub](https://github.com/DHTMLX/react-scheduler-demo).

## XSS-, CSRF- und SQL-Injection-Attacken

Beachten Sie, dass Scheduler keine Mittel bereitstellt, um eine Anwendung gegen verschiedene Bedrohungen zu schützen, wie z. B. SQL-Injections oder XSS- und CSRF-Angriffe. Es ist wichtig, dass die Verantwortung für die Sicherheit einer Anwendung von den Entwicklern getragen wird, die das Backend implementieren.

Lesen Sie den [Application Security](guides/app-security.md)-Artikel, um die verwundbarsten Punkte der Komponente und Maßnahmen zur Verbesserung der Sicherheit Ihrer Anwendung kennenzulernen.