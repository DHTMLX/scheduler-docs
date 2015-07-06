day_date
=============
@short:sets the date format for the X-Axis of the Week and Units views
	

@type: string
@default:"%D, %F %j"
@views: week, units
@example:
scheduler.config.day_date = "%F %j";
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "week");

@template:	api_config
@descr:

<img src="api/weekView_properties.png"/>

@related:
	settings_format.md
