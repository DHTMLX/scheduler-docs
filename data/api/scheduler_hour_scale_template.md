hour_scale
=============

@short:specifies the items of the Y-Axis
	

@example:
scheduler.templates.hour_scale = function(date){
	return scheduler.date.date_to_str(scheduler.config.hour_date)(date);
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@params:
- date	Date	the date which needs formatting
@views:day, week, units
@descr:


@related:
	day_view_templates.md
    week_view_templates.md