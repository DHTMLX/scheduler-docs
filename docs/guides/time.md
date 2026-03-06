---
title: "Time and Date"
sidebar_label: "Time and Date"
---

# Time and Date

A pair of date selectors for setting some time and date period.

![time_editor](/img/time_editor.png)

~~~js
scheduler.locale.labels.section_time = 'Time period';

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## Properties

The following properties are mostly important and commonly set for the 'time' control (see the full list [here](api/config/lightbox.md)):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) section's name</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) section's height</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) the name of a data property that will be mapped to the section</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) the type of the section's control, "time" for a date-time control</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>year_range </b></td>
  <td>(<i>array, number</i>) sets a range for the year selector. The range can be set in 2 ways: <b>year_range: [2005, 2025]</b> - a period from 2005 till 2025 year <b>year_range: 10</b> - a period [current year - 10 years; current year + 10 years]</td>
  </tr>
  </tbody>
</table>


## Automatic end date in the Time control

To set the initial duration of events, and make the end date change automatically to preserve this value, use the [event_duration](api/config/event_duration.md) and [auto_end_date](api/config/auto_end_date.md) properties:

~~~js
// specify event duration in minutes for auto end time
scheduler.config.event_duration = 60; 
scheduler.config.auto_end_date = true;
~~~


[Automatic end date](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)


With such configuration, each time the user changes the start event time or date in the lightbox, the end event time and date change automatically, in order to make the event duration equal to 60 minutes 
(the value of the [event_duration](api/config/event_duration.md) option).


## Order of date-time selectors

You can change the order of date-time controls in the 'Time period' section or remove some of selectors. To do this, use the [time_format](api/config/lightbox.md) property:

~~~js
scheduler.config.lightbox.sections="["
  {name:"description", height:130, map_to:"text", type:"textarea", focus:true},
  {name:"time", ..., time_format:["%H:%i","%m","%d","%Y"]}
];
~~~

:::note
Note, you can't change the data presentation format in that way, just the order of items in the array. To change the format of the time part, use the [time_picker](api/template/time_picker.md) template.
:::

For example, you can change the format as in:

~~~js
//default
time_format:["%H:%i", "%m", "%d", "%Y"] 
//month goes first
time_format:["%m","%d", "%Y", "%H:%i"]
//the year selector is removed
time_format:["%H:%i", "%m", "%d"]
//incorrect
time_format:["%H:%i", "%M", "%d", "%Y"] //"%m" was changed to "%M"
~~~

## Mini calendar in the lightbox

The mini calendar (date picker) can be used in the lightbox for "start" and "end" dates selection.

![in_the_lightbox](/img/in_the_lightbox.png)

To place the mini calendar in the lightbox, follow these steps:


1. Include the extension file on the page:
~~~js
scheduler.plugins({
    minical: true
});
~~~
2. Set the <i>type</i> of the <b>time</b> section to <b>calendar_time</b> (instead of <b>time</b>):
~~~js
//default lightbox definition
scheduler.config.lightbox.sections="["
  {name:"description", height:200, map_to:"text", type:"textarea", focus:true},
  {name:"time", height:72, type:"time", map_to:"auto"}
];
//change type:"time" -> type:"calendar_time"
scheduler.config.lightbox.sections = [
  {name:"description", height:200, map_to:"text", type:"textarea", focus:true},
  {name:"time", height:72, type:"calendar_time", map_to:"auto" }
];
~~~


[Mini calendar in the lightbox](https://docs.dhtmlx.com/scheduler/samples/05_calendar/03_in_form.html)


To customize the mini calendar you can use [Mini Calendar Templates](guides/mini-calendar-templates.md).
