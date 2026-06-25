---
title: "Drag-and-Drop Zwischen Scheduler-Instanzen"
sidebar_label: "Drag-and-Drop Zwischen Scheduler-Instanzen"
---

# Drag-and-Drop zwischen Scheduler-Instanzen

:::info
Die Funktionalität ist nur für Commercial-, Enterprise- und Ultimate-Lizenzen verfügbar (seit dem 6. Oktober 2021).
:::


Wenn Sie mehrere Scheduler-Instanzen auf einer Seite anzeigen [guides/multiple-per-page.md], können Sie Drag-and-Drop-Operationen zwischen ihnen aktivieren, sodass Benutzer Ereignisse von einem Scheduler in einen anderen ziehen können und umgekehrt.

Um Drag-and-Drop-Unterstützung für Scheduler zu aktivieren, fügen Sie einfach die Erweiterung "**drag_between**" auf der Seite hinzu:

[Aktivierung der Drag-and-Drop-Unterstützung für mehrere Scheduler-Instanzen](Enabling drag-and-drop support for several schedulers)
~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">

<script>
scheduler.plugins({
    drag_between: true
});

scheduler.init('scheduler_here',new Date(2027, 5, 30),"week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2027, 5, 30),"week");
</script>
~~~

Sample **"samples/20_multiple/06_drag_between_layout.html"** provided in the [Scheduler PRO package](https://dhtmlx.com/docs/products/dhtmlxScheduler/).


### Drag-Ereignisse verweigern, zu/von einer Scheduler-Instanz
Um Drag-Ereignisse von einer Scheduler-Instanz zu verweigern, setzen Sie die [drag_out](api/config/drag_out.md)-Eigenschaft auf *false*:

~~~js
scheduler.config.drag_out = false;//restrict dragging events from this scheduler /*!*/
scheduler.init('scheduler_here',new Date(2027, 5,30),"week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2027, 5, 30),"week");
~~~


Um Drag-Ereignisse zu einer Scheduler-Instanz zu verweigern, setzen Sie die [drag_in](api/config/drag_in.md)-Eigenschaft auf *false*:

~~~js
scheduler.init('scheduler_here',new Date(2027, 5, 30),"week");
scheduler.load("./data/units.xml");


scheduler2.config.drag_in = false;//restrict dragging events to this scheduler /*!*/
scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2027, 5, 30),"week");
~~~

Sample **"samples/20_multiple/06_drag_between_layout.html"** provided in the [Scheduler PRO package](https://dhtmlx.com/docs/products/dhtmlxScheduler/).


### Drag-Ereignisse

- [onBeforeEventDragOut](api/event/onbeforeeventdragout.md) - löst aus, bevor das gezogene Ereignis aus dem Scheduler verschoben wird
- [onEventDragOut](api/event/oneventdragout.md) - löst aus, wenn ein gezogenes Ereignis aus dem Scheduler verschoben wird
- [onBeforeEventDragIn](api/event/onbeforeeventdragin.md) - löst aus, bevor ein gezogenes Ereignis über den Scheduler verschoben wird
- [onEventDragIn](api/event/oneventdragin.md) - löst aus, wenn ein gezogenes Ereignis über dem Scheduler verschoben wird
- [onEventDropOut](api/event/oneventdropout.md) - löst aus, wenn ein gezogenes Ereignis außerhalb des Scheduler abgelegt wird