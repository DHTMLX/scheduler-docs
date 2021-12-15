mark_now
=============

@short:enables/disables the marker displaying the current time	

@type: boolean
@require: limit
@default:true
@views:day, week, timeline
@example:
scheduler.config.mark_now = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");


@template:	api_config
@descr:

{{note  Note that in case of the Timeline view the [limit](extensions_list.md#limit) extension should be included on a page before the [Timeline](extensions_list.md#timeline) extension.}}

<img src="api/weekView_properties.png"/>


@relatedapi:
	api/scheduler_now_date_config.md
@related:limits.md
@relatedsample:
	02_customization/23_current_time.html
    

@apigroup: Time, time zones
    