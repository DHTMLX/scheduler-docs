---
title: "Day View"
sidebar_label: "Day"
---

# Day View

The Day view displays a single day of the calendar.

![day_view](/img/day_view.png)


## Initialization

The Day view is added to the [basic scheduler's markup](guides/scheduler-markup.md) by default. That's why you don't need to provide any extra code for adding the view to the scheduler. 

~~~js
//just usual initialization. The Day view will be added by default
scheduler.init('scheduler_here',new Date(2019,0,10),"week");
...
scheduler.load("/data/events");
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## Removing the Day view tab

To remove the Day view tab from the scheduler, remove the related div from the [scheduler's markup](guides/scheduler-markup.md):

~~~js
//remove this div to remove the Day tab
<div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div>
~~~

## Related guides

- [Common Config Instructions](guides/configuration.md)
- [Day View Templates](views/day-view-templates.md)
- [Loading Data](guides/loading-data.md)
- [Event Object Operations](guides/event-object-operations.md)
- [Blocking and Marking Dates](guides/limits.md)
- [Skins](guides/skins.md)
