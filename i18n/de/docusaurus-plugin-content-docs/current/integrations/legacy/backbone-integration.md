---
title: "Backbone-Integration (Legacy)"
sidebar_label: "Backbone-Integration (Legacy)"
---

# Backbone-Integration (Legacy)

:::warning
Dieser Artikel beschreibt eine veraltete Integration. Wenn Sie neu beginnen, sehen Sie sich die Framework-Integrationen oder das Vanilla-JS-Setup an.
:::

Seit der Version 4.0 bietet die Bibliothek eine spezielle Erweiterung [**mvc**](guides/extensions-list.md#legacy) an, die es ermöglicht, den Scheduler mit der Backbone-Bibliothek zu integrieren.

Wenn Sie eine auf Backbone basierende Anwendung haben und dort den Scheduler hinzufügen möchten (wobei die Daten weiterhin mit Backbone verwaltet werden), verwenden Sie die folgende Technik:

1. Fügen Sie die dhtmlxScheduler-Dateien zur App hinzu:
~~~js
<script src="../../codebase/dhtmlxscheduler.js" ></script>
<link rel="stylesheet" href="../../codebase/dhtmlxscheduler.css">
~~~
2. Aktivieren Sie die <b>mvc</b>-Erweiterung auf der Seite:
~~~js
scheduler.plugins({
    mvc: true
});
~~~
3. Initialisieren und konfigurieren Sie den Scheduler wie gewohnt:
~~~js
scheduler.full_day = true;

scheduler.init("scheduler_here",new Date(2019,0,6),"month");
~~~
4. Jetzt können Sie eine Daten-Sammlung in Backbone erstellen und den Scheduler damit verknüpfen:
~~~js
//you can use any model here
MyEvent   = Backbone.Model.extend({});
EventList = Backbone.Collection.extend({
    model:MyEvent,
    url:"./data/backbone.json"
});
events = new EventList();
            

scheduler.backbone(events); //link scheduler to collection
~~~

Danach wird der Scheduler Daten aus der Collection laden und alle Aktualisierungen spiegeln. Außerdem lösen Änderungen über die Scheduler-Benutzeroberfläche verwandte Ereignisse in der Backbone-Collection aus.

Wie Sie sehen, ist es ziemlich einfach. Alles, was Sie brauchen, ist die [backbone](api/method/backbone.md)-Methode zu verwenden statt der üblichen [load](api/method/load.md) oder [parse](api/method/parse.md) Methoden.

Die [backbone](api/method/backbone.md)-Methode sorgt dafür, dass der Scheduler alle Datenänderungen im Backbone-Modell widerspiegelt und umgekehrt.
Als Parameter akzeptiert die Methode eine Backbone-Collection.

[Backbone integration](https://docs.dhtmlx.com/scheduler/samples/10_integration/07_backbone.html)