---
title: "jQuery-Integration"
sidebar_label: "jQuery-Integration"
---

# jQuery-Integration

Ab Version 4.0 kann dhtmlxScheduler in jQuery integriert werden.

Ein Standard-Scheduler, der jQuery verwendet, kann wie folgt initialisiert werden:

~~~js
$(function(){
    $(".myscheduler").dhx_scheduler({
        date:new Date(2027,4,25),
        mode:"month"
    });
        
    scheduler.load("data/events");
});
~~~

- **".myscheduler"** - ein jQuery-kompatibler CSS-Selektor des Containers, in dem der Scheduler erstellt wird (in der PRO-Version können Sie den Scheduler gleichzeitig in mehreren Containern initialisieren).
- **dhx_scheduler()** - Methode initialisiert eine Instanz von dhtmlxScheduler. Als Parameter nimmt die Methode ein Konfigurationsobjekt:
  - **date** - (*Date*) das anfängliche Datum des Schedulers (standardmäßig das aktuelle Datum)
  - **mode** - (*string*) der Name der anfänglichen Ansicht (standardmäßig "week")
  - alle weiteren Konfigurationsparameter (in der Regel festgelegt über scheduler.config.xxxxx) können auf diese Weise festgelegt werden

:::note
Ein über jQuery-Aufruf initialisierter Scheduler kann dieselbe Konfiguration und API verwenden, wie sie auch vom Standard-Scheduler verwendet wird
:::

[jQuery-Integration](https://docs.dhtmlx.com/scheduler/samples/10_integration/06_jquery.html)