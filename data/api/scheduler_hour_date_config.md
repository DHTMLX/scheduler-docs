hour_date
=============
@short:sets the time format of Y-Axis. Also used in the default event and lighbox  templates for setting the time part.
	

@type:string
@default:"%H:%i"
@views:day, week, units 
@example:
scheduler.config.hour_date = "%H:%i:%s";
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "week");

@template:	api_config

@related:
	settings_format.md
@relatedapi:
	api/scheduler_hour_size_px_config.md
    api/scheduler_event_header_template.md
    api/scheduler_event_date_template.md
    api/scheduler_event_bar_date_template.md
@relatedsample:
	01_initialization_loading/02_hour_scale_format.html
	06_timeline/09_drag_duration.html
    
@descr:

<img src="api/weekView_properties.png"/>

@apigroup: Date format
