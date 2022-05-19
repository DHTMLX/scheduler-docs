display_marked_timespans
=============


@short:defines whether the marked(blocked) time spans should be highlighted in the scheduler
	

@type: boolean	

@default:true
@related:limits.md
@example:
scheduler.config.display_marked_timespans = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");


@template:	api_config
@descr:
The property is available from version 3.5.

{{note The property requires the [limit](extensions_list.md#limit) plugin to be activated.}}

If you set the option to *false*, time spans will continue to be blocked, but will be displayed as usual scheduler cells. 

@apigroup: Time, time zones
