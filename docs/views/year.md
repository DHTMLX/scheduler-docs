---
title: "Year View"
sidebar_label: "Year"
---

# Year View 

The Year view presents a single or more years of the calendar.

![year_view](/img/year_view.png)


[Year view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/04_year_view.html)


## Initialization

To add the Year view to the scheduler, follow these steps:

1.<b>Activate the Year extension on the page:</b>
~~~js
scheduler.plugins({
    year_view: true
});
~~~
2.<b>Add the view's tab to the scheduler's markup:</b>
~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="year_tab" style="right:280px;"></div>
    </div>
    ...    
</div>
~~~
3.<b>Set the label for the tab:</b>
~~~js
//'year_tab' is the name of our div
scheduler.locale.labels.year_tab ="Year"; 
~~~

[Year view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/04_year_view.html)

## GUI details 

- Dates which have some events assigned are highlighted. 
- Hovering over a date will show the tooltip with a list of all assigned events. You can click on the 'details' icon inside the tooltip to open the lightbox (if only the readonly mode is not activated).


## Setting the number of months in the view

To define the number of months in a row and a column, use the [year_x](api/config/year_x.md) and [year_y](api/config/year_y.md) properties:

~~~js
//the Year view will display only 6 months
scheduler.config.year_x = 2; //2 months in a row
scheduler.config.year_y = 3; //3 months in a column

~~~


## Related guides

- [Common Config Instructions](guides/configuration.md)
- [Year View Templates](views/year-view-templates.md)
- [Loading Data](guides/loading-data.md)
- [Event Object Operations](guides/event-object-operations.md)
- [Blocking and Marking Dates](guides/limits.md)
- [Skins](guides/skins.md)
