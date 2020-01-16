month_scale_date
=============
@short:specifies the date format of the X-Axis of the view
	
@params:
- date		Date	the date which needs formatting

@views:month

@example:
const formatMonthScale = scheduler.date.date_to_str("%l");

scheduler.templates.month_scale_date = function(date){
    return formatMonthScale(date);
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:


@related:
	month_view_templates.md