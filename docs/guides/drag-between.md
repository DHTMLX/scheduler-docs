---
title: "Drag-and-Drop Between Schedulers"
sidebar_label: "Drag-and-Drop Between Schedulers"
---

# Drag-and-drop between schedulers

:::info
The functionality is available for the Commercial (since October 6, 2021), Enterprise and Ultimate licenses only.
:::


If you display [multiple schedulers on a page](guides/multiple-per-page.md), you can enable drag-and-drop operations between them so users could drag events from one scheduler to another and vice versa.

To enable drag-and-drop support for scheduler, just include the "**drag_between**" extension on the page:

[Enabling drag-and-drop support for several schedulers](Enabling drag-and-drop support for several schedulers)
~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">

<script>
scheduler.plugins({
    drag_between: true
});

scheduler.init('scheduler_here',new Date(2019, 5, 30),"week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2019, 5, 30),"week");
</script>
~~~

Sample **"samples/20_multiple/06_drag_between_layout.html"** provided in the [Scheduler PRO package](https://dhtmlx.com/docs/products/dhtmlxScheduler/).


### Denying dragging events to\/from one of schedulers
To deny dragging events from a scheduler, set the [drag_out](api/config/drag_out.md) property to *false*:

~~~js
scheduler.config.drag_out = false;//restrict dragging events from this scheduler /*!*/
scheduler.init('scheduler_here',new Date(2019, 5,30),"week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2019, 5, 30),"week");
~~~


To deny dragging events to a scheduler, set the [drag_in](api/config/drag_in.md) property to *false*:

~~~js
scheduler.init('scheduler_here',new Date(2019, 5, 30),"week");
scheduler.load("./data/units.xml");


scheduler2.config.drag_in = false;//restrict dragging events to this scheduler /*!*/
scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2019, 5, 30),"week");
~~~

Sample **"samples/20_multiple/06_drag_between_layout.html"** provided in the [Scheduler PRO package](https://dhtmlx.com/docs/products/dhtmlxScheduler/).


### Drag events

- [onBeforeEventDragOut](api/event/onbeforeeventdragout.md) -  fires before the dragged event is moved out of the scheduler
- [onEventDragOut](api/event/oneventdragout.md) - fires when a dragged event  is moved out of the scheduler
- [onBeforeEventDragIn](api/event/onbeforeeventdragin.md) - fires before a dragged event is moved over the scheduler
- [onEventDragIn](api/event/oneventdragin.md) - fires when a dragged event is moved over the scheduler
- [onEventDropOut](api/event/oneventdropout.md) - fires when a dragged event  is dropped onto the area out of the scheduler
