limit_view
=============
@short:limits the date period during which the user can view the events
	

@type: boolean

@default:false
@example:
scheduler.init('scheduler_here',new Date(2022,5,17),"week");
...
scheduler.config.limit_view  = true;

@related:limits.md
@template:	api_config
@descr:
For example, if we set a limit on the year 2023,  we can't move to the year 2022  - only 2023.

If you also specify the **limit_start/limit_end** configs to limit a range available for creating new events, **limit_view** won't allow you to view events outside the allowable date range.

~~~js
scheduler.config.limit_start = new Date(2022,5,15);
scheduler.config.limit_end = new Date(2022,6,15);
scheduler.config.limit_view  = true;
~~~

According to this configuration, you will be able to create events only in the range between June 15 and July 15, and to navigate the calendar only within this range of dates.

@apigroup: Time, time zones

@relatedapi:
api/scheduler_limit_start_config.md
api/scheduler_limit_end_config.md