---
title: "Mehrere Scheduler auf einer Seite erstellen"
sidebar_label: "Mehrere Scheduler auf einer Seite erstellen"
---

# Mehrere Scheduler auf einer Seite erstellen

:::info
Diese Funktionalität ist nur in der Scheduler PRO-Version verfügbar (Commercial (seit dem 6. Oktober 2021), Enterprise- und Ultimate-Lizenzen).
:::

Wie Sie wahrscheinlich zu Beginn Ihrer Arbeit mit der Bibliothek bemerkt haben, ist dhtmlxScheduler ein statisches Objekt, d.h. _nur eine Instanz_ von dhtmlxScheduler kann auf der Seite existieren.

Nun, für die PRO-Version sollten wir diese Aussage umformulieren und sagen: _mehr als eine Instanz_ von dhtmlxScheduler kann auf der Seite existieren. Sie haben weiterhin eine Standardinstanz des Schedulers, auf die über das globale **scheduler**-Objekt zugegriffen wird, aber Sie können auch neue Scheduler-Objekte erstellen.

## Scheduler-Instanz-Konfiguration

Um eine neue Instanz von dhtmlxScheduler zu erstellen, verwenden Sie die Methode **Scheduler.getSchedulerInstance()**:

~~~js
// Vorsicht, 'Scheduler' im Befehl beginnt mit Großbuchstabe
const scheduler = Scheduler.getSchedulerInstance();
~~~

Die Methode kann ein Konfigurationsobjekt als Parameter übernehmen:

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    plugins: {
        recurring: true,
    },
    container: "scheduler_here",
    config: {
        hour_date: "%h:%i",
        details_on_create: true
    },
    data: {
        events: [
            { id:1, start_date: "2027-04-18 09:00", end_date: "2027-04-18 12:00", 
                text:"English lesson", subject: 'english' },
            { id:2, start_date: "2027-04-20 10:00", end_date: "2027-04-21 16:00", 
                text:"Math exam", subject: 'math' },
            { id:3, start_date: "2027-04-21 10:00", end_date: "2027-04-21 14:00", 
                text:"Science lesson", subject: 'science' },
            { id:4, start_date: "2027-04-23 16:00", end_date: "2027-04-23 17:00", 
                text:"English lesson", subject: 'english' },
            { id:5, start_date: "2027-04-22 09:00", end_date: "2027-04-22 17:00", 
                text:"Usual event" }
        ]
    }
});
~~~

Das Konfigurationsobjekt kann die folgenden Eigenschaften enthalten:

- **container** - (*string|HTMLElement*) ein HTML-Container (oder dessen ID), in dem der Scheduler angezeigt wird. Falls nicht angegeben, wird der Scheduler ohne Container initialisiert.
- **config** - (*object*) ein Objekt mit Konfigurationseinstellungen des Scheduler
- **xy** - (*object*) ein Objekt mit [Größen der Scheduler-Elemente](api/other/xy.md)
- **templates** - (*object*) ein Objekt mit Templates 
- **events** - (*object*) ein Objekt mit Event-Handlern.


Für die Angabe von Event-Handlern für eine neue Scheduler-Instanz verwenden Sie folgendes Format:

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    events: {
        onEventCreated: function(id, e){
            const task = scheduler.getEvent(id);
            task.owner = null;
            return true;
        },
        onClick: function(id, e){
            alert(scheduler.getEvent(id).text);
            return true;
        }
    }
});
~~~

- **data** - (*object|string*) ein Objekt mit Daten zum Laden oder die URL, von der Daten geladen werden sollen
- **plugins** - (*object*) Erweiterungen, die aktiviert werden müssen
- **locale** - (*string|object*) ein zweibuchstabiger Sprachcode oder ein Objekt der Locale, die aktiviert werden muss

**Hinweis**, dass der Aufruf der **Scheduler.getSchedulerInstance()**-Methode ohne Parameter das Scheduler-Objekt mit Standardkonfigurationseinstellungen zurückgibt. Daher müssen Sie Ihre neue Instanz wie gewohnt konfigurieren, initialisieren und mit Daten füllen.

Nehmen wir ein einfaches Beispiel: 2 Scheduler, einer unter dem anderen:

~~~js
window.addEventListener("DOMContentLoaded", function(){
    const scheduler1  = Scheduler.getSchedulerInstance();
    scheduler1.init('scheduler_here',new Date(2027,5,30),"week");
    scheduler1.load("/data/events")
    
    const scheduler2 = Scheduler.getSchedulerInstance();
    scheduler2.init('scheduler_here_2',new Date(2027,5,30),"month");
    scheduler2.load("/data/events")    
)};

<body>
    <div id="scheduler_here" style="width:100%; height: 50%;"></div>
    <div id="scheduler_here_2" style="width:100%; height: 50%;"></div>    
</body>
~~~

## Destruktor von Scheduler- und DataProcessor-Instanzen

Ab Version 6.0 verfügt das dhtmlxScheduler-Objekt über einen [Destruktor](api/method/destructor.md), mit dem unnötige Instanzen des Scheduler entsorgt werden können.

Der Destruktor der Scheduler-Instanz kann wie folgt verwendet werden:

~~~js
const myScheduler = Scheduler.getSchedulerInstance();
 
//Zerstören einer Scheduler-Instanz
myScheduler.destructor();
~~~

Der Destruktor führt folgende Aufgaben aus:

- löscht die in eine Scheduler-Instanz geladenen Daten
- zerstört den DataProcessor (falls er an den Scheduler angehängt ist)
- trennt den Scheduler vom DOM
- trennt alle DOM-Ereignisse, die über die Methode [scheduler.event()](api/method/event.md) an den Scheduler gebunden sind

### Verwendung des Destruktors mit Angular

Hier ein Beispiel der Verwendung des Destruktors zum Bereinigen einer Scheduler-Instanz im Angular-Framework:

~~~js
@Component({selector: 'app-scheduler', template: `...`})
class MySchedulerComponent implements OnDestroy {
  ngOnInit() {
     this.$gantt = Scheduler.getSchedulerInstance();

     // konfigurieren und initialisieren
  }
  
  ngOnDestroy() {
     this.$scheduler.destructor();
     this.$scheduler = null;
  }
}
~~~

### Abtrennen des DataProcessor

Durch Aufruf des Destruktors des DataProcessors wird die DataProcessor-Instanz bereinigt und vom Scheduler getrennt. Zum Beispiel:

~~~js
const scheduler = Scheduler.getSchedulerInstance();
const dp = new scheduler.DataProcessor("url");
dp.init(scheduler);

// zerstört den DataProcessor und trennt ihn vom Scheduler
dp.destructor();
~~~

:::note
If you use a package that does not allow creating multiple instances of the scheduler object (GPL or Commercial editions), calling the scheduler destructor will make the scheduler inaccessible until page reload.
:::