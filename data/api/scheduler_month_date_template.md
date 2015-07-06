month_date
=============
@short:specifies the date in the header of the view

@params:
- date		Date	the date which needs formatting


@example:
scheduler.templates.month_date = function(date){
    var dateToStr_func = scheduler.date.date_to_str(scheduler.config.month_date);
	return  dateToStr_func(date);
};
    
@views:month

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:


@related:
	month_view_templates.md