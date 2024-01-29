Sizing the Scale and Events Boxes  
==============

*If you use dhtmlxScheduler 6.0 or earlier, see details [here](sizing_old.md).*

In this article we consider how you can manage sizes of events and of the time scale.

## Short events display

First, let's learn the default behavior of the events boxes:

+ the default scale unit height is 44px (or the hour height), as defined by api/scheduler_hour_size_px_config.md
+ the minimum height of the event box is 20px, as defined by the **scheduler.xy.min_event_height** setting
+ since an event can't be less than 20px height, both 15min and 5min events will have the same height
+ events that have less than 42px height use a special display mode and receive an extra CSS class to enable display of shorter events:
	+ `.dhx_cal_event--small` - events less than 42px
	+ `.dhx_cal_event--xsmall` - events less than 30px

<img src="30_minute_short_event.png" style="border: 1px solid #E4E4E4"/>

You can increase the height of the time scale to improve the visibility of such events:

~~~js
scheduler.config.hour_size_px = 90;
scheduler.render();// or scheduler.init(...)
~~~

<img src="30_minute_long_event.png" style="border: 1px solid #E4E4E4"/>

### Customizing the event box

It is possible to completely override the render function of the event box. To do so you should use the api/scheduler_renderevent.md method that allows you to set your own template for the events:

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

{{note
This config is enabled by default starting from v7.0. You only need to enable it manually, if you use an earlier version of the Scheduler.
}}

## How to change the scale spacing

To change the default scale spacing you need to rewrite the api/scheduler_hour_scale_template.md template.
To make the scale spacing equal to 30 minutes you can rewrite the template as follows:

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

@index:
sizing_old.md