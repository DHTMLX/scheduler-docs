Day View
======================================
The Day view displays a single day of the calendar.

<img src="day_view.png"/>



Initialization
--------------------
The Day view is added to the [basic scheduler's markup](how_to_start.md#step2relateddivelements) by default. That's why you don't need to provide any extra code for adding the view to the scheduler. 

~~~js
//just usual initialization. The Day view will be added by default
scheduler.init('scheduler_here',new Date(2010,0,10),"week");
...
scheduler.load("data/events.xml");
~~~

{{sample
	01_initialization_loading/01_basic_init.html
}}


Removing the Day view tab
-----------------------------------------
To remove the Day view tab from the scheduler, remove the related div from the [scheduler's markup](how_to_start.md#step2relateddivelements):

~~~js
//remove this div to remove the Day tab
<div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div>
~~~

Related guides
----------------------------------------

- configuration.md
- day_view_templates.md
- loading_data.md
- event_object_operations.md
- limits.md
- skins.md

