---
title: "Week Agenda View"
sidebar_label: "Week Agenda"
---

# Week Agenda View 

:::info
This view is available in the Scheduler PRO version only.
:::

The Week Agenda view is a combination of Week and Agenda views presenting a list of upcoming events within a week.

![weekagenda_view](/img/weekagenda_view.png)


[WeekAgenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/24_week_agenda.html)


## Initialization

To add the Week Agenda view to the scheduler, follow these steps:

1.<b>Activate the Week Agenda extension on the page:</b>
~~~js
scheduler.plugins({
    week_agenda: true
});
~~~
2.<b>Add the view's tab to the scheduler's markup:</b>
~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="week_agenda_tab" style="right:280px;"></div>
    </div>
    ...    
</div>
~~~
3.<b>Set the label for the tab:</b>
~~~js
//'weekAg_tab' is the name of our div
scheduler.locale.labels.week_agenda_tab = "Week Agenda"; 
~~~

[WeekAgenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/24_week_agenda.html)

## GUI details 

- Selected events are highlighted. If the selected event occupies several days, all related records are highlighted. 
- To create a new event - double click on the cell of a day which will be the holder of the creating event.
- To edit, delete an event - double click on the desired event to open the lightbox and perform the operation.

## Related guides

- [Common Config Instructions](guides/configuration.md)
- [WeekAgenda View Templates](views/weekagenda-view-templates.md)
- [Loading Data](guides/loading-data.md)
- [Skins](guides/skins.md)
- [Localization](guides/localization.md)
