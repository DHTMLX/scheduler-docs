---
title: "jQuery-Integration"
sidebar_label: "jQuery-Integration"
---

# jQuery-Integration

Ab Version 4.0 unterstützt dhtmlxScheduler die Integration mit jQuery.

So können Sie einen Standard-Scheduler mit jQuery initialisieren:

~~~js
$(function(){
    $(".myscheduler").dhx_scheduler({
        date:new Date(2019,4,25),
        mode:"month"
    });
        
    scheduler.load("data/events");
});
~~~

In diesem Beispiel gilt:

- **".myscheduler"** - ein jQuery-kompatibler CSS-Selektor für den Container, in dem der Scheduler erstellt wird (mit der PRO-Version ist es möglich, Scheduler gleichzeitig in mehreren Containern zu initialisieren).
- Die Methode **dhx_scheduler()** erstellt eine Instanz von dhtmlxScheduler. Sie akzeptiert ein Konfigurationsobjekt als Parameter:
  - **date** - (*Date*) legt das Anfangsdatum des Schedulers fest (Standardwert ist das aktuelle Datum)
  - **mode** - (*string*) gibt die Startansicht an (Standardwert ist "week")
  - weitere Konfigurationsoptionen (die normalerweise über scheduler.config.xxxxx gesetzt werden) können ebenfalls auf diese Weise übergeben werden
:::note
Ein über die jQuery-Methode initialisierter Scheduler unterstützt die gleichen Konfigurationseinstellungen und die gleiche API wie der Standardscheduler.
:::


[JQuery integration](https://docs.dhtmlx.com/scheduler/samples/10_integration/06_jquery.html)
