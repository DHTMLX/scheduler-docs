---
title: "Backbone-Integration"
sidebar_label: "Backbone-Integration"
---

# Backbone-Integration

Ab Version 4.0 bietet die Bibliothek eine spezielle Erweiterung [**mvc**](guides/extensions-list.md#mvc), die eine nahtlose Integration des Schedulers mit der Backbone-Bibliothek ermöglicht.

Für Anwendungen, die auf Backbone basieren und den Scheduler integrieren möchten, während die Daten weiterhin über Backbone verwaltet werden, kann folgende Vorgehensweise genutzt werden:

1. Fügen Sie die dhtmlxScheduler-Dateien zu Ihrer Anwendung hinzu:
~~~js
<script src="../../codebase/dhtmlxscheduler.js" ></script>
<link rel="stylesheet" href="../../codebase/dhtmlxscheduler.css">
~~~
2. Aktivieren Sie die mvc-Erweiterung auf der Seite:
~~~js
scheduler.plugins({
    mvc: true
});
~~~
3. Richten Sie den Scheduler wie gewohnt ein und initialisieren Sie ihn:
~~~js
scheduler.full_day = true;

scheduler.init("scheduler_here",new Date(2019,0,6),"month");
~~~
4. Erstellen Sie anschließend eine Backbone-Datensammlung und verbinden Sie den Scheduler damit:
~~~js
//Sie können hier jedes beliebige Model verwenden
MyEvent   = Backbone.Model.extend({});
EventList = Backbone.Collection.extend({
    model:MyEvent,
    url:"./data/backbone.json"
});
events = new EventList();
            

scheduler.backbone(events); //Scheduler mit Collection verbinden
~~~

Sobald dies erledigt ist, lädt der Scheduler die Daten aus der Collection und hält sich bei allen Aktualisierungen synchron. Ebenso lösen Änderungen, die über die Oberfläche des Schedulers vorgenommen werden, entsprechende Ereignisse in der Backbone-Collection aus.

Dieser Prozess ist sehr unkompliziert. Wichtig ist, dass Sie die Methode [backbone](api/method/backbone.md) anstelle der üblichen Methoden [load](api/method/load.md) oder [parse](api/method/parse.md) verwenden.


Die Methode [backbone](api/method/backbone.md) sorgt dafür, dass der Scheduler mit allen Datenänderungen im Backbone-Modell und umgekehrt synchron bleibt.
Sie akzeptiert eine Backbone-Collection als Parameter.


[Backbone integration](https://docs.dhtmlx.com/scheduler/samples/10_integration/07_backbone.html)
