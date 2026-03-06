---
title: "Week View"
sidebar_label: "Week"
---

# Week View

The Week view displays one or more weeks at a time.

![week_view](/img/week_view.png)


## Initialization

The Week view is added to the [basic scheduler's markup]([Scheduler Markup](guides/scheduler-markup.md)) by default. That's why you don't need to provide any extra code for adding the view to the scheduler. 

~~~js
//just usual initialization. The Week view will be added by default
scheduler.init('scheduler_here',new Date(2019,0,10),"week");
...
scheduler.load("/data/events");
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## Removing the Week view tab

To remove the Week view tab from the scheduler, remove the related div from the [scheduler's markup](guides/scheduler-markup.md):

~~~js
//remove this div to remove the Week tab
<div class="dhx_cal_tab" name="week_tab" style="right:204px;"></div>
~~~


## Hiding days in the X-Axis of the view

To hide some days in the scale, e.g. leave just work days and remove holidays, use the **ignore_week()** method. 


The method is a function that takes the day date as a parameter. To hide a certain day, return *true* for it.

~~~js
// 0 refers to Sunday, 6 - to Saturday
scheduler.ignore_week = function(date){
    if (date.getDay() == 6 || date.getDay() == 0) //hides Saturdays and Sundays
        return true;
};
~~~


[Hiding days in the scale of Week view](https://docs.dhtmlx.com/scheduler/samples/11_scales/02_week_ignore.html)


## Related guides

- [Common Config Instructions](guides/configuration.md)
- [Week View Templates](views/week-view-templates.md)
- [Loading Data](guides/loading-data.md)
- [Event Object Operations](guides/event-object-operations.md)
- [Blocking and Marking Dates](guides/limits.md)
- [Skins](guides/skins.md)
