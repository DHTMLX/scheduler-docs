now_date
=============
@short:sets the date for the current-time marker in the Limit extension (enabled by the configuration - mark_now)

@type: Date
@example:
scheduler.config.now_date = new Date(2010, 7, 5);
...
scheduler.init('scheduler_here', new Date(2010, 7, 5), "week");

@template:	api_config
@descr:
{{note The property requires the [limit](extensions_list.md#limit) plugin to be enabled.}}

The option is applicable to the [Limit extension](limits.md) only.


@relatedapi:
	api/scheduler_mark_now_config.md
    
@related:
	limits.md
	
@apigroup: Time, time zones