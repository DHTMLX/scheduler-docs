---
title: "dhtmlxScheduler mit React"
sidebar_label: "dhtmlxScheduler mit React"
---

# dhtmlxScheduler mit React

Diese Anleitung setzt grundlegende Kenntnisse in [React](https://react.dev/) voraus. Wenn Sie neu bei React sind, empfiehlt es sich, zunächst die [React-Dokumentation](https://legacy.reactjs.org/docs/getting-started.html) für ein einführendes Tutorial zu lesen.

DHTMLX Scheduler funktioniert gut mit React. Ein passendes Beispiel finden Sie auf GitHub: [DHTMLX Scheduler mit React Demo](https://github.com/DHTMLX/react-scheduler-demo).

## Erstellen eines Projekts

Stellen Sie vor dem Erstellen Ihres Projekts sicher, dass [Node.js](https://nodejs.org/en/) installiert ist.

Um ein einfaches React-Projekt zu erstellen, führen Sie folgenden Befehl aus:

~~~
npx create-vite my-react-scheduler-app --template react
~~~

### Installation der Abhängigkeiten

Navigieren Sie anschließend in Ihr App-Verzeichnis. In diesem Beispiel verwenden wir **my-react-scheduler-app**:

~~~
cd my-react-scheduler-app
~~~

Installieren Sie dann die Abhängigkeiten und starten Sie den Entwicklungsserver mit dem bevorzugten Paketmanager:

- Mit yarn:

~~~
yarn install
yarn dev
~~~

- Mit npm:

~~~
npm install
npm run dev
~~~

Ihr React-Projekt sollte nun unter **http://localhost:5173** laufen.

![Scheduler React app running](/img/scheduler_react_app_run.png)

## Scheduler erstellen

Um den DHTMLX Scheduler hinzuzufügen, stoppen Sie zunächst die App mit **Strg+C** in der Kommandozeile. Installieren Sie danach das Scheduler-Paket.

## Schritt 1. Paketinstallation

Die PRO-Versionen der Bibliothek sind über **npm/yarn** aus unserem privaten Repository verfügbar. Bitte folgen Sie 
[dieser Anleitung](/guides/installation.md#npmevaluationandproversions), um Zugriff zu erhalten.

Sobald Sie die Evaluierungsversion des Schedulers haben, installieren Sie sie mit einem der folgenden Befehle:

- Mit npm:

~~~
npm install @dhx/trial-scheduler
~~~

- Mit yarn:

~~~
yarn add @dhx/trial-scheduler
~~~

Alternativ können Sie das Paket auch
[aus einem lokalen Ordner installieren](/guides/installation.md#installfromlocalfolder), da das ZIP-Paket der Bibliothek als **npm**-Modul strukturiert ist.

## Schritt 2. Komponentenerstellung

Erstellen Sie als Nächstes eine React-Komponente, um den Scheduler zu Ihrer App hinzuzufügen. Legen Sie einen Ordner ***src/components/Scheduler*** an und erstellen Sie darin die Dateien: ***Scheduler.jsx***, ***Scheduler.css*** und ***index.js***.

Beginnen Sie mit ***Scheduler.css*** und fügen Sie folgende Styles für den *scheduler-container* hinzu:

~~~js title="src/components/Scheduler/Scheduler.css"
.scheduler-container {
    height: 100vh;
    width: 100vw;
}
~~~

Damit der Scheduler-Container den gesamten Body ausfüllt, entfernen Sie die Standard-Styles aus ***App.css*** im ***src***-Ordner und fügen Sie Folgendes hinzu:

~~~
#root {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

Legen Sie dann die Datei ***index.js*** mit folgendem Inhalt an:

~~~js title="src/components/Scheduler/index.js"
import Scheduler from './Scheduler';
import './Scheduler.css';
export default Scheduler;
~~~

### Importieren der Quell-Dateien

Öffnen Sie ***Scheduler.jsx*** und importieren Sie die Scheduler-Quell-Dateien. Je nachdem, wie Sie das Paket installiert haben, sehen die Imports so aus:

- Wenn aus einem lokalen Ordner installiert:

~~~js title="Scheduler.jsx"
import { Scheduler } from 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';
~~~

- Bei Verwendung der Trial-Version:

~~~js title="Scheduler.jsx"
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';
~~~

In diesem Tutorial wird die **Trial**-Version verwendet.

### Container setzen und Scheduler hinzufügen

Um den Scheduler auf der Seite anzuzeigen, richten Sie einen Container ein. Erstellen Sie ***Scheduler.jsx*** mit folgendem Code:

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

## Schritt 3. Scheduler zur App hinzufügen

Fügen Sie nun die Scheduler-Komponente zu Ihrer App hinzu. Öffnen Sie ***src/App.jsx*** und ersetzen Sie den Standardinhalt durch:

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

Wenn Sie die App erneut starten, sollte ein leerer Scheduler auf der Seite erscheinen:

![Scheduler React init](/img/scheduler_init.png)

## Schritt 4. Daten bereitstellen

Um Events im Scheduler anzuzeigen, stellen Sie einen Datensatz bereit. Erstellen Sie ***data.js*** im **src** -Verzeichnis und fügen Sie einige Events hinzu:

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

Geben Sie diese Daten dann als Props an die Scheduler-Komponente in ***App.jsx*** weiter:

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

Verwenden Sie die Props in der **scheduler.parse()**-Methode innerhalb der Scheduler-Komponente:

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

Wenn Sie die App-Seite jetzt neu laden, wird der Scheduler mit geladenen Events angezeigt:

![Scheduler React events](/img/scheduler_events.png)

## Schritt 5. Daten speichern

Um Änderungen im Scheduler zu verarbeiten, können Sie den [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html)-Handler verwenden. Damit kann die Kommunikation mit Ihrem Server-Backend erfolgen. Der Handler kann eine Funktion oder ein Router-Objekt sein. dhtmlxScheduler unterstützt Promise-Antworten vom Handler, sodass Aktionen korrekt verarbeitet werden.

Erstellen Sie einen **DataProcessor** mit **createDataProcessor()** und erfassen Sie Änderungen wie folgt:

~~~
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

Wenn Ihr Backend nach dem Erstellen eines neuen Eintrags die Event-ID ändert (was üblich ist), stellen Sie sicher, dass Ihr Promise ein Objekt mit **(id: databaseId)** oder **(tid: databaseId)** zurückgibt. So kann der Scheduler den Datensatz mit der neuen Datenbank-ID aktualisieren. Weitere Details finden Sie unter [server side integration](/guides/server-integration.md).

Damit ist Ihre React-Scheduler-Integration abgeschlossen. Sie können das vollständige Demo auf GitHub erkunden: [DHTMLX react-scheduler-demo](https://github.com/DHTMLX/react-scheduler-demo).

## XSS-, CSRF- und SQL-Injection-Angriffe

Beachten Sie, dass der Scheduler selbst keinen Schutz gegen Bedrohungen wie SQL-Injections, XSS oder CSRF-Angriffe bietet. Die Absicherung Ihrer Anwendung gegen diese Risiken liegt in der Verantwortung der Backend-Entwickler.

Lesen Sie den Artikel [Application Security](/guides/app-security.md), um mehr über häufige Schwachstellen und Möglichkeiten zur Verbesserung der Sicherheit Ihrer App zu erfahren.
