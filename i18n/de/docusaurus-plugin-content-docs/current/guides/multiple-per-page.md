---
title: "Mehrere Scheduler auf einer Seite erstellen"
sidebar_label: "Mehrere Scheduler auf einer Seite erstellen"
---

# Mehrere Scheduler auf einer Seite erstellen

:::info
Diese Funktion ist nur in der Scheduler PRO-Version verfügbar (kommerziell seit dem 6. Oktober 2021, Enterprise- und Ultimate-Lizenzen).
:::

Zu Beginn der Arbeit mit der Bibliothek ist Ihnen vielleicht aufgefallen, dass dhtmlxScheduler ein statisches Objekt ist. Das bedeutet, dass _nur eine Instanz_ von dhtmlxScheduler auf der Seite existieren kann.

Mit der PRO-Version ändert sich das jedoch: _mehrere Instanzen_ von dhtmlxScheduler können nun auf derselben Seite koexistieren. Es gibt weiterhin die Standard-Scheduler-Instanz, die über das globale **scheduler**-Objekt zugänglich ist, aber Sie können zusätzlich weitere Scheduler-Objekte erstellen.

## Konfiguration einer Scheduler-Instanz {#schedulerinstanceconfiguration}

Um eine neue dhtmlxScheduler-Instanz zu erstellen, verwenden Sie die Methode **Scheduler.getSchedulerInstance()**:

~~~js
// Beachten Sie, dass 'Scheduler' mit einem Großbuchstaben beginnt
const scheduler = Scheduler.getSchedulerInstance();
~~~

Diese Methode kann ein Konfigurationsobjekt als Argument entgegennehmen:

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
            { id:1, start_date: "2022-04-18 09:00", end_date: "2022-04-18 12:00", 
                text:"English lesson", subject: 'english' },
            { id:2, start_date: "2022-04-20 10:00", end_date: "2022-04-21 16:00", 
                text:"Math exam", subject: 'math' },
            { id:3, start_date: "2022-04-21 10:00", end_date: "2022-04-21 14:00", 
                text:"Science lesson", subject: 'science' },
            { id:4, start_date: "2022-04-23 16:00", end_date: "2022-04-23 17:00", 
                text:"English lesson", subject: 'english' },
            { id:5, start_date: "2022-04-22 09:00", end_date: "2022-04-22 17:00", 
                text:"Usual event" }
        ]
    }
});
~~~

Das Konfigurationsobjekt kann folgende Eigenschaften enthalten:

- **container** - (*string|HTMLElement*) Der HTML-Container (oder dessen ID), in dem der Scheduler gerendert wird. Wenn nicht angegeben, wird der Scheduler ohne Container initialisiert.
- **config** - (*object*) Konfigurationseinstellungen für den Scheduler
- **xy** - (*object*) Größen der Scheduler-Elemente, siehe [](api/other/xy.md)
- **templates** - (*object*) Template-Konfiguration
- **events** - (*object*) Ereignis-Handler. 


Wenn Sie Ereignis-Handler für eine neue Scheduler-Instanz angeben, verwenden Sie folgendes Format:

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    events: {
        onEventCreated: function(id, e){
            var task = scheduler.getEvent(id);
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

- **data** - (*object|string*) Zu ladende Daten oder eine URL, von der die Daten geladen werden sollen
- **plugins** - (*object*) Zu aktivierende Erweiterungen
- **locale** - (*string|object*) Entweder ein zweistelliger Sprachcode oder ein Locale-Objekt zur Aktivierung

**Hinweis:** Wenn Sie **Scheduler.getSchedulerInstance()** ohne Parameter aufrufen, erhalten Sie ein Scheduler-Objekt mit den Standard-Einstellungen. Sie müssen Ihre neue Instanz wie gewohnt konfigurieren, initialisieren und mit Daten befüllen.

Hier ein einfaches Beispiel mit zwei untereinander angeordneten Schedulern:


~~~js
window.addEventListener("DOMContentLoaded", function(){
    var scheduler1  = Scheduler.getSchedulerInstance();
    scheduler1.init('scheduler_here',new Date(2019,5,30),"week");
    scheduler1.load("/data/events");
    
    var scheduler2 = Scheduler.getSchedulerInstance();
    scheduler2.init('scheduler_here_2',new Date(2019,5,30),"month");
    scheduler2.load("/data/events");    
});

<body>
    <div id="scheduler_here"></div>
    <div id="scheduler_here_2"></div>    
</body>
~~~

## Destruktor von Scheduler- und DataProcessor-Instanzen {#destructor-of-scheduler-and-dataprocessor-instances}

Ab Version 6.0 stellt dhtmlxScheduler eine [destructor](api/method/destructor.md) bereit, um nicht mehr benötigte Scheduler-Instanzen zu entfernen.

Sie können den Destruktor einer Scheduler-Instanz wie folgt verwenden:

~~~js
var myScheduler = Scheduler.getSchedulerInstance();
 
// Scheduler-Instanz zerstören
myScheduler.destructor();
~~~

Der Destruktor führt folgende Aktionen aus:

- löscht die in der Scheduler-Instanz geladenen Daten
- zerstört den DataProcessor, falls vorhanden
- entfernt den Scheduler aus dem DOM
- entfernt alle über die Methode [scheduler.event()](api/method/event.md) hinzugefügten DOM-Events

### Verwendung des Destruktors mit Angular

So können Sie den Destruktor verwenden, um eine Scheduler-Instanz bei der Arbeit mit Angular aufzuräumen:

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

### DataProcessor abtrennen

Der Aufruf des Destruktors eines DataProcessors entfernt die Instanz und trennt sie vom Scheduler. Beispiel:

~~~js
var scheduler = Scheduler.getSchedulerInstance();
var dp = new scheduler.DataProcessor("url");
dp.init(scheduler);

// zerstört den DataProcessor und trennt ihn vom Scheduler
dp.destructor();
~~~

:::note
Wenn Sie ein Paket verwenden, das keine mehreren Scheduler-Instanzen unterstützt (wie GPL- oder Commercial-Editionen), wird der Scheduler nach dem Aufruf des Destruktors nicht mehr verfügbar sein, bis die Seite neu geladen wird.
:::

## Verwandte Artikel

- [Integration mit dhtmlxLayout](integrations/legacy/dhxlayout-integration.md)
