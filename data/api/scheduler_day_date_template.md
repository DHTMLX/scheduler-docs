day_date
=============
@short:specifies the date in the header of the Day and Units views
	

@example:
scheduler.templates.day_date = function(date){
	var formatFunc = scheduler.date.date_to_str(scheduler.config.default_date);
    return formatFunc(date);
};


@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@params:
- date	Date	the date which needs formatting
@descr:


@views:day, units


@related:
	day_view_templates.md
	