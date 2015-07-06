Time
============================

A pair of date selectors for setting some date period.

<img src="time_editor.png"/>

~~~js
scheduler.locale.labels.section_time = 'Time period';

scheduler.config.lightbox.sections = [
	{ name:"text", height:50, map_to:"text", type:"textarea", focus:true },
	{ name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

{{sample
	01_initialization_loading/01_basic_init.html
}}

Initialization
-----------------------
One Time control is added to the lighbox by default. To add another one, follow these steps:
<ol>
    <li><b>Add the section to the lightbox configuration:</b>
~~~js
scheduler.config.lightbox.sections = [
	{ name:"text", ... },
   	{ name:"time2", height:50, map_to:"location", type:"time"},
	{ name:"time", ...}
];
~~~
	</li>
    <li><b>Set the label for the section:</b>
~~~js
scheduler.locale.labels.section_time2 = "Duration";
~~~
	</li>
</ol>

        


Properties
---------------------------------------------
The following properties are mostly important and commonly set for the 'time' control (see the full list <a href="api/scheduler_lightbox_config.md">here</a>):

<table class="webixdoc_links">
	<tbody>
    	<tr>
			<td class="webixdoc_links0"><b>name</b></td>
			<td>(<i>string</i>) section's name </td>
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
			<td>(<i>textarea,time,select,template,multiselect,radio,checkbox</i>) the type of the section's control</td>
		</tr>
    </tbody>
</table>


Automatic end date in the Time control
--------------------------------------
To set the initial duration of events, and make the end date automatically change to preserve this value, use
 the api/scheduler_event_duration_config.md and api/scheduler_auto_end_date_config.md properties:

~~~js
//specify event duration in minutes for auto end time
scheduler.config.event_duration = 60; 
scheduler.config.auto_end_date = true;
~~~

{{sample
	02_customization/11_auto_end_date.html
}}

With such configuration, each time the user changes the start event time or date in the lightbox, 
the end event time and date will be changed automatically, in order to make the event duration equal to 60 minutes 
(the value of the api/scheduler_event_duration_config.md option).


Changing the order of date-time selectors and removing specific selectors
-------------------------------------------------

You can change the order of date-time controls in the 'Time period' section or remove some of selectors. To do this, 
use the [time_format](api/scheduler_lightbox_config.md) property:

~~~js
scheduler.config.lightbox.sections=[
  {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
  {name:"time", ..., time_format:["%H:%i","%m","%d","%Y"]}
];

~~~

{{note
Note, you can't change the data presentation format in that way, just the order of items in the array. To change the format of the time part use the api/scheduler_time_picker_template.md template
}}

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

