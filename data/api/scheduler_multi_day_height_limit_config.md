multi_day_height_limit
=============
@short:sets the height of the area that displays multi-day events
	

@type: number, boolean
@views: day, week, units
@default:200
@example:
scheduler.config.multi_day_height_limit = 30;
...
scheduler.init('scheduler_here',new Date(2013,7,11),"week");

@template:	api_config
@relatedapi:
	api/scheduler_multi_day_config.md
@descr:

As a boolean value, the property can take only the *false* value.

@apigroup: Events/Multi-day events

@changelog:
changed from `false` to `200` in v7.0.1