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

The config will take effect only if it is applied before the first initialization of the scheduler:

~~~js
scheduler.config.day_date = "%F %j";
scheduler.init('scheduler_here', new Date(2020, 7, 5), "day");
~~~

If you want to change the date format after the initialization, you need to redefine the [day_date](api/scheduler_day_date_template.md) template:

~~~js
var formatDayDate = scheduler.date.date_to_str("%F %j");
scheduler.templates.day_date = function(date) {
    return formatDayDate(date);
};
~~~

@related:
	settings_format.md
	templates.md

@apigroup: Date format

