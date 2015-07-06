separate_short_events
=============
@short:allows preventing short events from overlapping
	

@type: boolean
@default:false
@views:day, week, units
@example:
scheduler.config.separate_short_events = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");

@template:	api_config
@descr:

<img src="api/separateShortEvents_property.png"/>