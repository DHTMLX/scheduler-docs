first_hour
=============

@short:sets the minimum value for the hour scale (Y-Axis)
	

@type: number
@default: 0 (zero)
@views:day, week, units
@example:
scheduler.config.first_hour = 9;
scheduler.config.last_hour = 18;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");

@template:	api_config
@descr:
<img src="api/day_view_properties.png"/>

@relatedsample:
	01_initialization_loading/05_loading_database.html
    02_customization/24_cascade_event_display.html
@relatedapi:
	api/scheduler_last_hour_config.md
    api/scheduler_limit_time_select_config.md
    
@apigroup: General settings/Scale
