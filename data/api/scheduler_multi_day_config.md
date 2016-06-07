multi_day
=============
@short:enables rendering of multi-day events

	

@type: boolean
@default:false
@views:day, week, units
@relatedsample:
	01_initialization_loading/01_basic_init.html
    01_initialization_loading/06_multi_day_events.html
@relatedapi:
	api/scheduler_multi_day_height_limit_config.md
@example:
scheduler.config.multi_day = true;
...		
scheduler.init('scheduler_here',new Date(2013,7,11),"week");

@template:	api_config
@descr:

@apigroup: Events/Multi-day events