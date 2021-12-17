limit_view
=============
@short:limits the date period during which the user can view the events
	

@type: boolean

@default:false
@example:
scheduler.config.limit_view  = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");

@related:limits.md
@template:	api_config
@descr:
{{note The property requires the [limit](extensions_list.md#limit) plugin to be activated.}}

For example, if we set a limit on the year 2010,  we can't move to the year 2009  - only 2010 and further.

@apigroup: Time, time zones

@relatedapi:
api/scheduler_limit_start_config.md
api/scheduler_limit_end_config.md