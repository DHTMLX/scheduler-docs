---
title: "Month View"
sidebar_label: "Month"
---

# Month View

The Month view displays a single month of the calendar.

![month_view](/img/month_view.png)


## Initialization

The Month view is added to the [basic scheduler's markup](guides/scheduler-markup.md) by default. That's why you don't need to provide any extra code for adding the view to the scheduler. 

~~~js
//just usual initialization. The Month view will be added by default
scheduler.init('scheduler_here',new Date(2027,0,10),"month");
...
scheduler.load("/data/events");
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## Removing the Month view tab

To remove the Month view tab from the scheduler, remove the related div from the [scheduler's markup](guides/scheduler-markup.md):

~~~js
//remove this div to remove the Month tab
<div class="dhx_cal_tab" name="month_tab" style="right:204px;"></div>
~~~


## Limiting the number of events in a cell 

By default, the scheduler lengthens the cell's height to display all assigned events. 

Starting from version 4.0, you have the possibility to control the number of events,displayable in a cell, and thereby the maximum height of cells.

To set the maximum number of events in a cell, use the [max_month_events](api/config/max_month_events.md) option:

~~~
scheduler.config.max_month_events = 3;
..
scheduler.init('scheduler_here', new Date(2027,5,30),"month");
~~~

If the number of assigned events exceeds the option's value, the scheduler will display the 'View more' link. 
The link will redirect the user to the Day view, where he or she can see a full list of assigned events.


['View more' link in the Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/31_view_more.html)

## Hiding days in the X-Axis of the view

To hide some days in the scale, e.g. leave just work days and remove holidays, use the **ignore_month()** method. 


The method is a function that takes the cell date as a parameter. To hide a certain day, return *true* for it.

~~~js
// 0 refers to Sunday, 6 - to Saturday
scheduler.ignore_month = function(date){
    if (date.getDay() == 6 || date.getDay() == 0) //hides Saturdays and Sundays
        return true;
};
~~~


[Hiding week days in the scale of Month view](https://docs.dhtmlx.com/scheduler/samples/11_scales/01_month_ignore.html)


## Presenting days' numbers as clickable links

Days' numbers in the Month view can be presented as clickable links that open the related day in the specified view.

To display days in the view's cells as clickable links:

1. 
Enable the <b>active_links</b> extension on the page:
~~~js
scheduler.plugins({
    active_links: true
});
~~~
2. (<i>Optionally</i>) Specify the [active_link_view](api/config/active_link_view.md) to set the view you want to open month's days in. By default, it's the [Day View](views/day.md):
~~~js
//the user will be skipped to the Week view after clicking on a day link
scheduler.config.active_link_view = "week";
...
scheduler.init('scheduler_here',new Date(2027,7,6),"month");
~~~


[Month days as links](https://docs.dhtmlx.com/scheduler/samples/03_extensions/06_links_plugin.html)


## Resizing events by drag-n-drop (ver. 4.1+)

By default, users can't resize events in the Month view by drag-n-drop (only through the edit form). 

To provide resizing of multi-day events by drag-n-drop, set the [resize_month_events](api/config/resize_month_events.md) property to *true*:

~~~js
//resizing multi-day events by drag-n-drop
scheduler.config.resize_month_events = true; /*!*/

scheduler.init('scheduler_here',new Date(2027,0,10),"month");
~~~

[Resizable events in Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/32_resizable_month_events.html)


To provide resizing both multi- and single-day events by drag-n-drop, set the [resize_month_timed](api/config/resize_month_timed.md) property to *true* as well:

~~~js
//resizing both single- and multi-day events by drag-n-drop
scheduler.config.resize_month_events = true;/*!*/
scheduler.config.resize_month_timed= true;  /*!*/
scheduler.init('scheduler_here',new Date(2027,0,10),"month");
~~~

**Please, note:**

- The [resize_month_timed](api/config/resize_month_timed.md) property makes sense only with the [resize_month_events](api/config/resize_month_events.md) property enabled.
- When the [resize_month_timed](api/config/resize_month_timed.md) property is enabled, single-day events change their look:

![resizemonthtimed_config](/img/resizemonthtimed_config.png)
  

## Related guides

- [Common Config Instructions](guides/configuration.md)
- [Month View Templates](views/month-view-templates.md)
- [Loading Data](guides/loading-data.md)
- [Event Object Operations](guides/event-object-operations.md)
- [Blocking and Marking Dates](guides/limits.md)
- [Skins](guides/skins.md)
