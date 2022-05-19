default_date
=============
@short:sets the date format used by the templates 'day_date', 'week_date', 'day_scale_date' for setting date in the views' headers
	

@type: string
@default: "%j %M %Y"
@views:day, timeline, week, weekagenda, units
@example:
scheduler.config.default_date = "%j %M %Y";
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");



@template:	api_config
@descr:
<img src="api/day_view_properties.png"/>

@relatedsample:
	06_timeline/05_week_lines.html
@relatedapi:
	api/scheduler_day_date_template.md
    api/scheduler_week_date_template.md
    api/scheduler_day_scale_date_template.md
@related:
	settings_format.md

@apigroup: Date format
	