Month View
===============================
The Month view displays a single month of the calendar.

<img src="month_view.png"/>



Initialization
--------------------
The Month view is added to the  [basic scheduler's markup](scheduler_markup.md) by default. That's why you don't need to provide any extra code for adding the view to the scheduler. 

~~~js
//just usual initialization. The Month view will be added by default
scheduler.init('scheduler_here',new Date(2010,0,10),"month");
...
scheduler.load("data/events.xml");
~~~

{{sample
	01_initialization_loading/01_basic_init.html
}}


Removing the Month view tab
-----------------------------------------
To remove the Month view tab from the scheduler, remove the related div from the [scheduler's markup](scheduler_markup.md):

~~~js
//remove this div to remove the Month tab
<div class="dhx_cal_tab" name="month_tab" style="right:204px;"></div>
~~~


Limiting the number of events in a cell 
---------------------------------------------------------
By default, the scheduler lengthens the cell's height to display all assigned events. 

Starting from version 4.0, you have the possibility to control the number of events,displayable in a cell, and thereby the maximum height of cells.

To set the maximum number of events in a cell, use the  api/scheduler_max_month_events_config.md option:

~~~
scheduler.config.max_month_events = 3;
..
scheduler.init('scheduler_here', new Date(2013,5,30),"month");
~~~

If the number of assigned events exceeds the option's value, the scheduler will display the 'View more' link. 
The link will redirect the user to the Day view, where he or she can see a full list of assigned events.

{{sample
	02_customization/31_view_more.html
}}
Hiding days in the X-Axis of the view
------------------------------------------------
To hide some days in the scale, e.g. leave just work days and remove holidays, use the **ignore_month()** method. <br>
The method is a function that takes the cell date as a parameter. To hide a certain day, return *true* for it.

~~~js
// 0 refers to Sunday, 6 - to Saturday
scheduler.ignore_month = function(date){
	if (date.getDay() == 6 || date.getDay() == 0) //hides Saturdays and Sundays
		return true;
};
~~~

{{sample
	11_scales/01_month_ignore.html
}}


Presenting  days' numbers as clickable links
--------------------------------------------------------
Days' numbers in the Month view can be presented as clickable links that open the related day in the specified view.

To display days in the view's cells as clickable links:

<ol>
	<li>
Include the <b>ext/dhtmlxscheduler_active_links.js</b> extension file on the page:
~~~html
  <script src="../codebase/ext/dhtmlxscheduler_active_links.js"></script>
~~~
	</li>
	<li> (<i>Optionally</i>) Specify the api/scheduler_active_link_view_config.md to set the view you want to open month's days in. By default, it's the day_view.md:
~~~js
//the user will be skipped to the Week view after clicking on a day link
scheduler.config.active_link_view = "week";
...
scheduler.init('scheduler_here',new Date(2012,7,6),"month");
~~~
	</li>
</ol>

{{sample
	03_extensions/06_links_plugin.html
}}

Resizing events by drag-n-drop (ver. 4.1+)
-------------------------------------------------------------
By default, users can't resize events in the Month view by drag-n-drop (only through the edit form). 

To provide resizing of multi-day events by drag-n-drop, set the api/scheduler_resize_month_events_config.md property to *true*:

~~~js
//resizing multi-day events by drag-n-drop
scheduler.config.resize_month_events = true; /*!*/

scheduler.init('scheduler_here',new Date(2010,0,10),"month");
~~~
{{sample
02_customization/32_resizable_month_events.html
}}

<br>

To provide resizing both multi- and single-day events by drag-n-drop, set the api/scheduler_resize_month_timed_config.md property to *true* as well:

~~~js
//resizing both single- and multi-day events by drag-n-drop
scheduler.config.resize_month_events = true;/*!*/
scheduler.config.resize_month_timed= true;  /*!*/
scheduler.init('scheduler_here',new Date(2010,0,10),"month");
~~~

**Please, note:**

- The api/scheduler_resize_month_timed_config.md property makes sense only with the api/scheduler_resize_month_events_config.md property enabled.
- When the api/scheduler_resize_month_timed_config.md property is enabled, single-day events change their look:

<img src="api/resizemonthtimed_config.png"/>
    

Related guides
----------------------------------------

- configuration.md
- month_view_templates.md
- loading_data.md
- event_object_operations.md
- limits.md
- skins.md

