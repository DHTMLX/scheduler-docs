last_hour
=============

@short:sets the maximum value of the hour scale (Y-Axis)
	
@type: number
@default:24
@views:day, week, units
@example:
scheduler.config.first_hour = 9;
scheduler.config.last_hour = 18;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");


@template:	api_config
@descr:
<img src="api/dayView_properties.png"/>


@relatedsample:
	03_extensions/25_advanced_limitation.html
    03_extensions/26_multi_day_visible.html
    
@relatedapi:
	api/scheduler_first_hour_config.md  
    api/scheduler_limit_time_select_config.md
    
@apigroup: General settings/Scale
