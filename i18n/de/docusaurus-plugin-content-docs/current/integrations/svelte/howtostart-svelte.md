---
title: "dhtmlxScheduler mit Svelte"
sidebar_label: "dhtmlxScheduler mit Svelte"
---

# dhtmlxScheduler mit Svelte

Diese Anleitung setzt grundlegende Kenntnisse in Svelte voraus. Falls Sie noch keine Erfahrung mit Svelte haben, finden Sie im [Svelte-Handbuch](https://svelte.dev/) ein hilfreiches Tutorial für den Einstieg.

DHTMLX Scheduler funktioniert gut mit Svelte. Ein funktionierendes Beispiel finden Sie auf GitHub: [DHTMLX Scheduler mit Svelte Demo](https://github.com/DHTMLX/svelte-scheduler-demo).

## Projekt erstellen

Bevor Sie ein neues Projekt anlegen, stellen Sie sicher, dass [Vite](https://vite.dev/) (optional) und [Node.js](https://nodejs.org/en/) installiert sind.

Um ein Svelte-Projekt mit Vite zu erstellen, führen Sie folgenden Befehl aus:

~~~
npm create vite@latest
~~~

Weitere Details finden Sie im [entsprechenden Artikel](https://svelte.dev/docs/introduction#start-a-new-project-alternatives-to-sveltekit).

### Abhängigkeiten installieren

Navigieren Sie anschließend in Ihr App-Verzeichnis. Nennen wir das Projekt **scheduler-svelte** und wählen die Option **svelte**. Führen Sie dann aus:

~~~
cd scheduler-svelte
~~~

Installieren Sie danach die Abhängigkeiten und starten Sie die App mit Ihrem bevorzugten Paketmanager:

- Für **yarn**:

~~~
yarn install
yarn dev
~~~

- Für **npm**:

~~~
npm install
npm run dev
~~~

Ihr Svelte-Projekt sollte nun unter [http://localhost:5173](http://localhost:5173) laufen.

![Scheduler Svelte App läuft](/img/scheduler_svelte_app_run.png)

## Scheduler erstellen

Um DHTMLX Scheduler hinzuzufügen, stoppen Sie zunächst die App mit **Ctrl+C** im Terminal. Installieren Sie anschließend das Scheduler-Paket.

## Schritt 1. Paketinstallation

PRO-Versionen der Bibliothek sind über **npm/yarn** aus unserem privaten Repository verfügbar. Folgen Sie 
[dieser Anleitung](/guides/installation.md#npmevaluationandproversions), um Zugriff zu erhalten.

Sobald Sie die Evaluierungsversion haben, installieren Sie sie mit:

- npm:

~~~
npm install @dhx/trial-scheduler
~~~

- yarn:

~~~
yarn add @dhx/trial-scheduler
~~~

Alternativ, da das Zip-Paket der Bibliothek als **npm**-Modul strukturiert ist, können Sie es auch 
[aus einem lokalen Ordner installieren](/guides/installation.md#installfromlocalfolder).

## Schritt 2. Komponentenerstellung

Erstellen Sie eine neue Svelte-Komponente, um den Scheduler in Ihre App einzubinden. Legen Sie im ***src/***-Verzeichnis eine Datei mit dem Namen ***Scheduler.svelte*** an.

### Import der Quell-Dateien

Öffnen Sie ***Scheduler.svelte*** und importieren Sie die Scheduler-Dateien. Je nach Installationsmethode:

- Bei Installation aus einem lokalen Ordner sehen die Imports so aus:

~~~js title="Scheduler.svelte"
import { Scheduler } from "dhtmlx-scheduler";
import "dhtmlx-scheduler/codebase/dhtmlxscheduler.css";
~~~

- Bei Verwendung der Trial-Version sollten die Imports wie folgt aussehen:

~~~js title="Scheduler.svelte"
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
~~~

Diese Anleitung verwendet die **trial**-Version.

### Container setzen und Scheduler hinzufügen

Um den Scheduler anzuzeigen, definieren Sie ein Containerelement, in dem er gerendert wird. Der folgende Code zeigt, wie das geht:

~~~js title="Scheduler.svelte"
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

<div bind:this="{container}"></div>
~~~

Damit der Scheduler-Container den gesamten Body ausfüllt, entfernen Sie die Standard-Styles aus ***app.css*** in ***src/*** und fügen Sie Folgendes hinzu:

~~~js title="src/app.css"
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## Schritt 3. Scheduler in die App einbinden

Fügen Sie als Nächstes die Scheduler-Komponente in Ihre App ein. Öffnen Sie ***src/App.svelte*** und ersetzen Sie den Standardinhalt durch:

~~~js title="App.svelte"
<script>
  import Scheduler from "./Scheduler.svelte";
</script>

<Scheduler/>
~~~

Wenn Sie die App starten, sollte ein leerer Scheduler auf der Seite erscheinen:

![Scheduler Svelte Init](/img/scheduler_init.png)

## Schritt 4. Daten bereitstellen

Um Termine anzuzeigen, müssen Sie dem Scheduler Daten bereitstellen. Erstellen Sie eine Datei ***data.js*** in ***src/*** und fügen Sie Beispieldaten hinzu:

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

Übergeben Sie diese Daten dann als Prop an die Scheduler-Komponente in ***App.svelte***:

~~~js title="App.svelte"
<script>
  import Scheduler from "./Scheduler.svelte";
  import { getData } from "./data.js";
</script>

<Scheduler data="{getData()}" />
~~~

Verwenden Sie in ***Scheduler.svelte*** das Prop mit **scheduler.parse()**:

~~~js title="Scheduler.svelte"
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

<div bind:this="{container}"></div>
~~~

Nach dem Neuladen der App wird der Scheduler mit Terminen angezeigt:

![Scheduler Svelte Events](/img/scheduler_events.png)

## Schritt 5. Daten speichern

Um Änderungen im Scheduler zu verarbeiten, verwenden Sie den [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html)-Handler, der die Kommunikation mit einem Server-Backend ermöglicht. Der Handler kann eine Funktion oder ein Router-Objekt sein. dhtmlxScheduler unterstützt Promise-Rückgaben und wartet daher korrekt auf abgeschlossene Aktionen.

Erstellen Sie einen **DataProcessor** mit **createDataProcessor()** und erfassen Sie Änderungen wie folgt:

~~~js
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

Falls Ihr Backend beim Erstellen neuer Einträge die Event-IDs ändert (häufiger Fall), stellen Sie sicher, dass Ihr Promise ein Objekt mit **(id: databaseId)** oder **(tid: databaseId)** zurückgibt, damit der Scheduler das Ereignis entsprechend aktualisieren kann. Weitere Informationen finden Sie unter [Server Side Integration](/guides/server-integration.md).

Mit dieser Einrichtung ist Ihr Svelte Scheduler einsatzbereit. Das vollständige Demo finden Sie auf GitHub: [svelte-scheduler-demo](https://github.com/DHTMLX/svelte-scheduler-demo).

## XSS-, CSRF- und SQL-Injection-Angriffe

Beachten Sie, dass der Scheduler selbst keinen Schutz gegen Bedrohungen wie SQL-Injection, XSS oder CSRF bietet. Die Absicherung der Anwendung liegt in der Verantwortung der Backend-Entwickler.

Lesen Sie den Artikel [Application Security](/guides/app-security.md), um die Schwachstellen der Komponente und empfohlene Sicherheitsmaßnahmen zu verstehen.
