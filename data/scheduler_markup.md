Scheduler Markup
=====================================
The standard scheduler's markup looks like this:


~~~html
<div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:100%;'>
	<div class="dhx_cal_navline">
    	<div class="dhx_cal_prev_button">&nbsp;</div>
        <div class="dhx_cal_next_button">&nbsp;</div>
        <div class="dhx_cal_today_button"></div>
        <div class="dhx_cal_date"></div>
        <div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div>
        <div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div>
        <div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>
   	</div>
    <div class="dhx_cal_header"></div>
    <div class="dhx_cal_data"></div>       
</div>
~~~

<img src="markup.png"/>

Tabs positioning 
--------------------------

###Default ('terrace') skin
Initially, the default ('terrace') skin ignores the CSS properties used to set the tab's position (e.g. style="right:204px;") and locates the tab using its specific logic: the default views are presented 
as a segmented button at the left side but additional views are placed as individual buttons at the right side.


To set the position manually (e.g. in the markup), set the api/scheduler_fix_tab_position_config.md parameter to *false* to disable the default behaviour and set the coordinates with CSS properties:

~~~js
scheduler.config.fix_tab_position = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

Notice that you can use the following CSS classes to create a segmented button:

- **dhx_cal_tab_last** - makes the right border rounded
- **dhx_cal_tab_first** - makes the left border rounded
- **dhx_cal_tab_standalone** - makes the both borders rounded


For example, to set the 'day'-'week'-'month' segmented button in the default skin manually, you can specify the markup as in:
~~~html
<div class="dhx_cal_tab dhx_cal_tab_first" name="day_tab" style="left:14px;"></div>
<div class="dhx_cal_tab" name="week_tab"  style="left: 75px;"></div>
<div class="dhx_cal_tab dhx_cal_tab_last" name="month_tab" style="left:136px"></div>
~~~

###'Glossy' and 'Classic' skins
The 'classic', 'glossy' skins apply the coordinates specified in the scheduler's markup initially and don't require disabling of the default behavior.

~~~html
<div class="dhx_cal_navline">
	...
	<div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div>
	<div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div>
	<div class="dhx_cal_tab" name="agenda_tab" style="right:280px;"></div>
	<div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>
</div>
~~~

Adding/deleting views' tabs 
---------------------------
###Adding a tab
To add a new tab to the header, add a div with the **"dhx_cal_tab"** class as a child node of the **"dhx_cal_navline"** element:

~~~html
<div class="dhx_cal_navline">
	...
	<div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div>
	<div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div>
	<div class="dhx_cal_tab" name="timeline_tab" style="right:280px;"></div>
	<div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>
</div>
~~~

The view that will be opened on a tab click is defined by the **name** attribute and specified as **{viewName}_tab**.

{{note
Note, the tab can have several CSS classes applied, but the **"dhx_cal_tab"** class must go first.
}}

###Deleting a tab
To remove a tab from the header, remove the related div from the markup:

{{snippet
Removing the 'month' tab from the header
}}

~~~html
<div class="dhx_cal_navline">
	...
	<div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div>
	<div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div>
</div>
~~~

{{note
Even if the tab is removed, the related view is still accessible programmatically with the  api/scheduler_setcurrentview.md and api/scheduler_updateview.md methods.
}}


Hiding the navigation buttons
--------------------------------
To hide the navigation buttons in the scheduler's header, set the 'display:none' style for the related divs as in:

{{snippet
Hiding the navigation buttons in the header
}}
~~~html
<style>
	.dhx_cal_prev_button, .dhx_cal_next_button{
		display:none;
	}
</style>

<div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:100%;'>
	<div class="dhx_cal_navline">
    	<div class="dhx_cal_prev_button">&nbsp;</div>
        <div class="dhx_cal_next_button">&nbsp;</div>
        <div class="dhx_cal_today_button"></div>
        ...
   	</div>
    <div class="dhx_cal_header"></div>
    <div class="dhx_cal_data"></div>       
</div>
~~~


Hiding the scheduler's header
--------------------------------
To hide the entire scheduler's header, set the [nav_height](api/scheduler_xy_other.md) property to 0: 

~~~js
scheduler.xy.nav_height = 0;
...
scheduler.init('scheduler_here', new Date(2010, 0, 10), "month");
~~~

