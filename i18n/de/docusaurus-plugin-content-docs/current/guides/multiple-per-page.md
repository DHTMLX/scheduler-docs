---
title: "Mehrere Scheduler auf einer Seite erstellen"
sidebar_label: "Mehrere Scheduler auf einer Seite erstellen"
---

# Mehrere Scheduler auf einer Seite erstellen

:::info
Diese Funktionalität ist nur in der Scheduler PRO-Version verfügbar (Commercial (seit dem 6. Oktober 2021), Enterprise- und Ultimate-Lizenzen).
:::

Wie Sie wahrscheinlich zu Beginn Ihrer Arbeit mit der Bibliothek bemerkt haben, ist dhtmlxScheduler ein statisches Objekt, d.h. _nur eine Instanz_ von dhtmlxScheduler kann auf der Seite existieren.

Nun, für die PRO-Version sollten wir diese Aussage umformulieren und sagen: _mehrere Instanzen_ von dhtmlxScheduler können auf der Seite existieren. Sie haben immer noch eine Standardinstanz des Schedulers, die über das globale **scheduler**-Objekt zugänglich ist, aber Sie können auch neue Scheduler-Objekte erstellen.

## Scheduler-Instanz-Konfiguration

Um eine neue Instanz von dhtmlxScheduler zu erstellen, verwenden Sie die Methode `Scheduler.getSchedulerInstance()`:

~~~js
// Vorsicht, 'Scheduler' im Befehl wird groß geschrieben
const scheduler = Scheduler.getSchedulerInstance();
~~~

Die Methode kann ein Konfigurationsobjekt als Parameter entgegennehmen:

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    plugins: {
        recurring: true
    },
    container: "scheduler_here",
    config: {
        hour_date: "%h:%i",
        details_on_create: true
    },
    data: {
        events: [
            { id: 1, start_date: "2027-04-18 09:00", end_date: "2027-04-18 12:00", text: "English lesson", subject: 'english' },
            { id: 2, start_date: "2027-04-20 10:00", end_date: "2027-04-21 16:00", text: "Math exam", subject: 'math' },
            { id: 3, start_date: "2027-04-21 10:00", end_date: "2027-04-21 14:00", text: "Science lesson", subject: 'science' },
            { id: 4, start_date: "2027-04-23 16:00", end_date: "2027-04-23 17:00", text: "English lesson", subject: 'english' },
            { id: 5, start_date: "2027-04-22 09:00", end_date: "2027-04-22 17:00", text: "Usual event" }
        ]
    }
});
~~~

Das Konfigurationsobjekt kann die folgenden Eigenschaften enthalten:

- `container` - (*string|HTMLElement*) ein HTML-Container (oder dessen ID), in dem der Scheduler angezeigt wird. Falls nicht angegeben, wird der Scheduler ohne Container initialisiert
- `config` - (*object*) ein Objekt mit Konfigurationseinstellungen des Schedulers
- `xy` - (*object*) ein Objekt mit [Größen der Scheduler-Elemente](api/other/xy.md)
- `templates` - (*object*) ein Objekt mit Vorlagen
- `events` - (*object*) ein Objekt mit Ereignis-Handlern

Sie müssen bei der Angabe von Ereignis-Handlern für eine neue Scheduler-Instanz das folgende Format verwenden:

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    events: {
        onEventCreated: (id) => {
            const createdEvent = scheduler.getEvent(id);
            createdEvent.owner = null;
            return true;
        },
        onClick: (id) => {
            alert(scheduler.getEvent(id).text);
            return true;
        }
    }
});
~~~

- `data` - (*object|string*) ein Objekt mit Daten zum Laden oder die URL, von der Daten geladen werden
- `plugins` - (*object*) Erweiterungen, die aktiviert werden müssen
- `locale` - (*string|object*) ein zweibuchstabiger Sprachcode oder ein Objekt der zu aktivierenden Locale

**Hinweis**, wenn Sie die Methode `Scheduler.getSchedulerInstance()` ohne Parameter aufrufen, wird das Scheduler-Objekt mit Standardeinstellungen zurückgegeben. Daher müssen Sie Ihre neue Instanz wie gewohnt konfigurieren, initialisieren und mit Daten füllen.

Nehmen wir ein einfaches Beispiel: 2 Scheduler, einer unter dem anderen:

~~~js
window.addEventListener("DOMContentLoaded", () => {
    const firstScheduler = Scheduler.getSchedulerInstance();
    firstScheduler.init("scheduler_here", new Date(2027, 5, 30), "week");
    firstScheduler.load("/data/events");

    const secondScheduler = Scheduler.getSchedulerInstance();
    secondScheduler.init("scheduler_here_2", new Date(2027, 5, 30), "month");
    secondScheduler.load("/data/events");
});
~~~

~~~html
<body>
    <div id="scheduler_here" style="width:100%; height: 50%;"></div>
    <div id="scheduler_here_2" style="width:100%; height: 50%;"></div>
</body>
~~~

## Destruktor- von Scheduler- und DataProcessor-Instanzen

Ab Version 6.0 hat das dhtmlxScheduler-Objekt eine [`destructor()`](api/method/destructor.md) Methode, die verwendet werden kann, um unnötige Instanzen des Scheduler zu entsorgen.

Der Destruktor der Scheduler-Instanz kann wie folgt verwendet werden:

~~~js
const schedulerInstance = Scheduler.getSchedulerInstance();

// Zerstörung einer Scheduler-Instanz
schedulerInstance.destructor();
~~~

Der Destruktor führt folgende Aufgaben durch:

- löscht die in eine Scheduler-Instanz geladene Daten
- zerstört den dataProcessor (falls er an den Scheduler angehängt ist)
- trennt den Scheduler vom DOM
- trennt alle DOM-Ereignisse, die über die [scheduler.event()](api/method/event.md) Methode angehängt wurden

### Verwendung des Destructors mit Angular

Hier ist ein Beispiel, wie der Destructor verwendet wird, um eine Scheduler-Instanz im Angular-Framework zu entsorgen:

~~~js
@Component({selector: 'app-scheduler', template: `...`})
class MySchedulerComponent implements OnDestroy {
    ngOnInit() {
        this.$scheduler = Scheduler.getSchedulerInstance();

        // konfigurieren und initialisieren
    }

    ngOnDestroy() {
        this.$scheduler.destructor();
        this.$scheduler = null;
    }
}
~~~

### Detaching the dataProcessor

Durch Aufruf des Destructors von dataProcessor wird die dataProcessor-Instanz gelöscht und vom Scheduler getrennt. Zum Beispiel:

~~~js
const schedulerInstance = Scheduler.getSchedulerInstance();
const dataProcessor = schedulerInstance.createDataProcessor({
    url: "url",
    mode: "REST"
});

// zerstört dataProcessor und trennt ihn vom Scheduler
dataProcessor.destructor();
~~~

:::note
Wenn Sie ein Paket verwenden, das das Erstellen mehrerer Instanzen des Scheduler-Objekts nicht zulässt (GPL- oder Commercial-Einträge), macht der Scheduler-Destruktor den Scheduler nach dem Seiten-Neuladen unzugänglich.
:::