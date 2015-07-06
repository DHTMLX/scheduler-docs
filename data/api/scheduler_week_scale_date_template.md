week_scale_date
=============
@short:specifies the date in the sub-header of the view

@params:
- date	Date	the date which needs formatting

@views:week

@example:
var format = scheduler.date.date_to_str(scheduler.config.day_date);
scheduler.templates.week_scale_date = function(date){
	return format(date);
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:


@related:
	week_view_templates.md