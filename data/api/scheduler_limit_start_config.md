limit_start
=============

@short:sets the start limit of the allowable date range
	

@type: Date

@default:null
@example:
scheduler.config.limit_start = new Date(2018,5,15);
scheduler.config.limit_end = new Date(2018,6,15);
...
scheduler.init('scheduler_here',new Date(2018,5,30),"week");

@template:	api_config
@descr:
{{note The property requires the [limit](extensions_list.md#limit) plugin to be activated.}}

The **limit_start/limit_end** configs allow limiting a range available for creating new events.
You can also limit the possibility to view events outside the allowable date range, by using the api/scheduler_limit_view_config.md property:

~~~js
scheduler.config.limit_start = new Date(2018,5,15);
scheduler.config.limit_end = new Date(2018,6,15);
scheduler.config.limit_view  = true;
~~~

@related:limits.md
@relatedsample:
	03_extensions/16_limitation.html
@relatedapi:
	api/scheduler_limit_end_config.md
    api/scheduler_limit_view_config.md

@apigroup: Time, time zones
