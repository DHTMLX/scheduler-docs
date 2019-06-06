config
=============
@short:defines configuration options for dates, scale, controls
	

@type:object

@example:
//sets the format of Y-Axis items
scheduler.config.hour_date = "%H:%i:%s";
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "month");

@template:	api_config
@descr:

The properties of the **config** object are described in a separate chapter of the root API page [Scheduler API: Properties](api/refs/scheduler.md#properties).

