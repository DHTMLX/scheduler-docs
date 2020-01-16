day_scale_date
=============
@short:specifies the date in the sub-header of the Day view
	
@example:
const formatDayScale = scheduler.date.date_to_str("%j %M %Y");

scheduler.templates.day_scale_date = function(date){
    return formatDayScale(date);
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler

@descr:

@views:day


@params:
- date	Date	the date which needs formatting

@related:
	day_view_templates.md