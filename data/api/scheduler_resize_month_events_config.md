resize_month_events
=============
@short:enables the possibility to resize multi-day events in the Month view by drag-and-drop
	

@type: boolean
@example:
scheduler.config.resize_month_events = true;

scheduler.init('scheduler_here',new Date(2010,0,10),"month");


@template:	api_config
@descr:
<img src="api/resizemonthevents_config.png"/>

@relatedsample:
	02_customization/32_resizable_month_events.html
@related:
	month_view.md#resizingeventsbydragndropver41
@relatedapi:
	api/scheduler_resize_month_timed_config.md

@views:month
@default:  false

@apigroup: Views/Month view