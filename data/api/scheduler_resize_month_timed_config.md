resize_month_timed
=============
@short:enables the possibility to resize single-day events in the Month view by drag-n-drop
	

@type: boolean
@example:
scheduler.config.resize_month_events = true; /*!*/
scheduler.config.resize_month_timed = true; /*!*/

scheduler.init('scheduler_here',new Date(2010,0,10),"month");


@template:	api_config
@descr:
Please, note:

- The property has sense only with the api/scheduler_resize_month_events_config.md property enabled.
- When the property is enabled, the single-day events change their look as in:

<img src="api/resizemonthtimed_config.png"/>

@related:
	month_view.md#resizingeventsbydragndropver41
@relatedapi:
	api/scheduler_resize_month_events_config.md

@views:month
@default:  false