month_day
=============
@short:specifies the format of the day in a cell


@params:
- date		Date	the date which needs formatting

@views:month, year

@example:
scheduler.templates.month_day = function(date){
	var dateToStr_func = scheduler.date.date_to_str(scheduler.config.month_day);
    return  dateToStr_func(date);
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:

@related:
	month_view_templates.md
    year_view_templates.md
