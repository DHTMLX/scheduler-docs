---
title: "dhtmlxScheduler mit Vue.js"
sidebar_label: "dhtmlxScheduler mit Vue.js"
---

# dhtmlxScheduler mit Vue.js

Diese Anleitung setzt grundlegende Kenntnisse von [Vue](https://vuejs.org/) Konzepten und Arbeitsweisen voraus. Falls Sie eine Auffrischung benötigen, bietet die [Vue 3 Dokumentation](https://vuejs.org/guide/introduction.html#getting-started) ein hilfreiches Einstiegs-Tutorial.

DHTMLX Scheduler funktioniert reibungslos mit Vue. Ein passendes Beispiel finden Sie auf GitHub: [DHTMLX Scheduler mit Vue Demo](https://github.com/DHTMLX/vue-scheduler-demo).

## Projekt erstellen

Bevor Sie ein neues Projekt starten, stellen Sie sicher, dass [Node.js](https://nodejs.org/en/) installiert ist.

Um ein Vue-Projekt zu erstellen, führen Sie diesen Befehl aus:

~~~
npm create vue@latest
~~~ 

Damit wird **create-vue**, das offizielle Vue-Projekt-Scaffolding-Tool, installiert und ausgeführt. Weitere Details finden Sie im 
[Vue.js Quick Start](https://vuejs.org/guide/quick-start.html#creating-a-vue-application).

### Installation der Abhängigkeiten

Navigieren Sie anschließend in das App-Verzeichnis. Für diese Anleitung nennen wir das Projekt **scheduler-vue** und führen aus:

~~~
cd scheduler-vue
~~~

Installieren Sie dann die Abhängigkeiten und starten Sie den Entwicklungsserver mit einem Paketmanager:

- Für **yarn**, führen Sie aus:

~~~
yarn install
yarn dev
~~~

- Für **npm**, führen Sie aus:

~~~
npm install
npm run dev
~~~

Ihr Vue-Projekt sollte nun unter [http://localhost:5173](http://localhost:5173) erreichbar sein.

![Scheduler Vue.js App läuft](/img/scheduler_vue_app_run.png)

## Scheduler erstellen

Bevor Sie den Scheduler hinzufügen, stoppen Sie die laufende App, indem Sie **Strg+C** im Terminal drücken. Danach fahren Sie mit der Installation des Scheduler-Pakets fort.

## Schritt 1. Paketinstallation

Die PRO-Versionen der Bibliothek sind über **npm/yarn** aus unserem privaten Repository verfügbar. Folgen Sie 
[dieser Anleitung](/guides/installation.md#npmevaluationandproversions), um Zugriff zu erhalten.

Sobald Sie die Evaluierungsversion des Schedulers haben, installieren Sie diese mit:

- npm:

~~~
npm install @dhx/trial-scheduler
~~~

- yarn:

~~~
yarn add @dhx/trial-scheduler
~~~

Alternativ, da das Bibliotheks-Zip-Paket als **npm**-Modul strukturiert ist, können Sie es auch 
[aus einem lokalen Ordner installieren](/guides/installation.md#installfromlocalfolder).

## Schritt 2. Komponentenerstellung

Erstellen Sie eine Vue-Komponente, um den Scheduler in Ihre App zu integrieren. Fügen Sie eine neue Datei mit dem Namen ***Scheduler.vue*** im Verzeichnis ***src/components/*** hinzu.

### Quell-Dateien importieren

Öffnen Sie ***Scheduler.vue*** und importieren Sie die Scheduler-Quell-Dateien. Abhängig von Ihrer Installationsmethode:

- Bei Installation aus einem lokalen Ordner sehen die Importe so aus:

~~~js title="Scheduler.vue"
import { Scheduler } from "dhtmlx-scheduler";
…
<style>
  @import "@dhtmlx-scheduler/codebase/dhtmlxscheduler.css";
</style>
~~~

- Für die Trial-Version sollten die Importe so aussehen:

~~~js title="Scheduler.vue"
import { Scheduler } from "@dhx/trial-scheduler";
…
<style>
  @import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
</style>
~~~

Dieses Tutorial verwendet die **trial**-Version des Schedulers.

### Container setzen und Scheduler hinzufügen

Um den Scheduler auf der Seite anzuzeigen, setzen Sie das Container-Element. Hier ist der relevante Code:

~~~js title="Scheduler.vue"
<script>
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

export default {
  mounted() {
    let scheduler = Scheduler.getSchedulerInstance();
    let date = scheduler.init(this.$refs.cont, new Date(2023, 9, 6), "week");
    this.scheduler = scheduler;
  },
  unmounted() {
    this.scheduler.destructor();
    this.$refs.cont.innerHTML = "";
  },
};
</script>

<template>
  <div ref="cont"></div>
</template>
~~~

Damit der Scheduler-Container den gesamten Body ausfüllt, entfernen Sie die Standard-Styles aus ***main.css*** im Verzeichnis ***src/assets*** und ersetzen Sie sie durch:

~~~js title="src/assets/main.css"
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## Schritt 3. Scheduler zur App hinzufügen

Fügen Sie als Nächstes die Scheduler-Komponente zur App hinzu. Öffnen Sie ***src/App.vue*** und ersetzen Sie den Standardinhalt durch:

~~~js title="src/App.vue"
<script>
import Scheduler from "./components/Scheduler.vue";

export default {
  components: { Scheduler },
};
</script>

<template>
  <Scheduler/>
</template>
~~~

Wenn Sie die App jetzt starten, sollte ein leerer Scheduler auf der Seite erscheinen:

![Scheduler Vue Init](/img/scheduler_init.png)

## Schritt 4. Daten bereitstellen

Um Ereignisse im Scheduler anzuzeigen, müssen Sie Daten bereitstellen. Erstellen Sie eine Datei namens ***data.js*** im Verzeichnis ***src/*** und fügen Sie einige Beispiel-Ereignisse hinzu:

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

Übergeben Sie diese Daten als Props an die Scheduler-Komponente in ***App.vue***:

~~~js title="App.vue"
<script>
import Scheduler from "./components/Scheduler.vue";
import { getData } from "./data";

export default {
  components: { Scheduler },
  data() {
    return {
      events: getData(),
    };
  },
};
</script>

<template>
  <Scheduler :events="events" />
</template>
~~~

Verwenden Sie dann die Props in der Methode **scheduler.parse()** innerhalb der Scheduler-Komponente:

~~~js title="Scheduler.vue"
<script>
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

export default {
  props: ["events"],
  mounted() {
    let scheduler = Scheduler.getSchedulerInstance();
    let date = scheduler.init(this.$refs.cont, new Date(2023, 5, 10), "week");
    scheduler.parse(this.events);

    this.scheduler = scheduler;
  },
  unmounted() {
    this.scheduler.destructor();
    this.$refs.cont.innerHTML = "";
  },
};
</script>

<template>
  <div ref="cont"></div>
</template>
~~~

Nach dem Neuladen der App-Seite wird der Scheduler nun mit Ereignissen angezeigt:

![Scheduler Vue Ereignisse](/img/scheduler_events.png)

## Schritt 5. Daten speichern

Um Änderungen im Scheduler zu verfolgen, können Sie den [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html) Handler verwenden, der die Kommunikation mit dem Server-Backend erleichtert. Der Handler kann als Funktion oder als Router-Objekt definiert werden. dhtmlxScheduler unterstützt Promise-Antworten vom Handler, sodass Aktionen korrekt verarbeitet werden.

Erstellen Sie einen **DataProcessor** mit der **createDataProcessor()** API-Methode und erfassen Sie Änderungen wie folgt:

~~~
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

Falls Ihr Backend die Event-ID nach dem Erstellen eines neuen Datensatzes ändert (was häufig vorkommt), stellen Sie sicher, dass Ihr Promise ein Objekt mit **(id: databaseId)** oder **(tid: databaseId)** zurückgibt. Dadurch kann der Scheduler den Datensatz mit der neuen Datenbank-ID aktualisieren. Weitere Informationen finden Sie unter [Server Side Integration](/guides/server-integration.md).

Damit ist Ihr Vue Scheduler Setup abgeschlossen. Sie können die vollständige Demo auf GitHub erkunden: [https://github.com/DHTMLX/vue-scheduler-demo](https://github.com/DHTMLX/vue-scheduler-demo).

## XSS-, CSRF- und SQL-Injection-Angriffe

Beachten Sie, dass der Scheduler selbst keinen Schutz vor Bedrohungen wie SQL-Injection, XSS oder CSRF-Angriffen bietet. Die Sicherstellung der Anwendungssicherheit liegt in der Verantwortung der Entwickler, insbesondere bei der Backend-Implementierung.

Lesen Sie den Artikel [Application Security](/guides/app-security.md), um die Schwachstellen der Komponente zu verstehen und Maßnahmen zur Erhöhung der Sicherheit Ihrer Anwendung zu ergreifen.
