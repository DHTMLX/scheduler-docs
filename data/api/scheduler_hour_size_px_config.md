hour_size_px
=============
@short:sets the height of an hour unit in pixels
	

@type: number
@default:42
@views:day, week, units
@example:
scheduler.config.hour_size_px = 40;
...
scheduler.init('scheduler_here', new Date(2010, 7, 5), "week");

@template:	api_config
@descr:
<img src="api/weekView_properties.png"/>

@relatedapi:
	 api/scheduler_hour_date_config.md
@relatedsample:
	01_initialization_loading/02_hour_scale_format.html
    02_customization/09_timestep.html
    
    
