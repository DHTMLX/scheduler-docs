Sizing the Scale and Events Boxes (v6.0)
==============

*The article refers to dhtmlxScheduler 6.0 or earlier versions. If you use dhtmlxScheduler 7.0+, see details [here](sizing.md).*

In this article we would like to consider scale's and event box's sizing through the example of solving 4 problems:

**Problem 1:** [Events that last less then 1 hour look in the scheduler the same as the 1-hour events do. 
I want short events to fit the scale.](sizing_old.md#howtomakeshorteventsfitthescale)
  
**Problem 2:** [Events that last less then 1 hour and occur at different times but within one hour overlap. I want such short events not to overlap.](sizing_old.md#preventingshorteventsfromoverlapping)
   
**Problem 3:** [I change the scale unit height and want to change the striped background accordingly.](sizing_old.md#howtochangethebackgroundaccordingtothesetscale)
  
**Problem 4:** [The default scale spacing is 1 hour. I want to change it and make, for example, 30 minutes.](sizing_old.md#howtochangethescalespacing)

## How to make short events fit the scale

First, let's learn the default behavior of the events boxes:

+ the default scale unit height is 44px (or the hour height)
+ the minimum height of the event box is 44px
+ events that last less than 1 hour take the size of 44px. So, 15-minute and 1-hour events will look the same in the scheduler
+ events that last more than 1 hour take their height according to the side scale (assuming that 1 hour is equal to 44px - a 90-minute event will take 63px in height).

Let's assume you want 30-minute events to fit the scale. Then you have 2 solutions:

- To increase the height of the scale's unit 
- To customize the event box

![30-minute_custom_event.png](30-minute_custom_event.png)

### Solution 1. Changing the scale unit's height

To change the height of the scale's unit, you should use the api/scheduler_hour_size_px_config.md configuration option.
  
For example, to increase the unit's height twice you should call the option as in:

~~~js
scheduler.config.hour_size_px = 88;

scheduler.init(...);
~~~

Now the scale unit's height is 88 px and the 30-minute event taking 44px will occupy the 30-minute height, as needed.

{{sample
	02_customization/09_timestep.html
}}

### Solution 2. Customizing the event box

To customize the events boxes display, you should use the api/scheduler_renderevent.md method that allows you to set your own template for the events.

~~~js
scheduler.renderEvent = function(container, ev) {
	//your customizing code
}
~~~

Read the details in the related chapter - custom_events_display.md.

{{sample
	02_customization/27_custom_event_box.html
}}

## Preventing short events from overlapping

To display short events separately and eliminate the possibility of their overlapping, 
you should set the api/scheduler_separate_short_events_config.md option to *true*:

~~~js
scheduler.config.separate_short_events = true;
~~~

![overlapping.png](overlapping.png)

## How to change the background according to the set scale 

The scheduler background is set by a mere image. To change the background image, you should redefine the related CSS class which is **.dhx_scale_holder**:

~~~html
<style>
.dhx_scale_holder {
	 background-image: url("imgs/myNewImage.png");
}
</style>
~~~

~~~js
scheduler.init(...);
~~~

![changing_background.png](changing_background.png)

## How to change the scale spacing

To change the default scale spacing, you need to rewrite the api/scheduler_hour_scale_template.md template. To make the scale spacing equal to 30 minutes, you can rewrite the template as follows:

~~~js
var format = scheduler.date.date_to_str("%H:%i");
var step = 30;
		
scheduler.templates.hour_scale = function(date){
	var html="";
	for (var i=0; i<60/step; i++){
		html+="<div style='height:22px;line-height:22px;'>"+format(date)+"</div>";
		date = scheduler.date.add(date,step,"minute");
	}
	return html;
}

~~~

![scale_spacing.png](scale_spacing.png)

**Related samples:**

{{sample
	02_customization/21_custom_hour_scale.html
}}


