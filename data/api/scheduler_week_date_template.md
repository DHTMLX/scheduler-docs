week_date
=============
@short:specifies the date in the header of the view
	
@params:
- start 	Date 	the start date of the view
- end 	Date 	the end date of the view

@example:
scheduler.templates.week_date = function(start, end){
    return scheduler.templates.day_date(start)+" &ndash; "+
    scheduler.templates.day_date(scheduler.date.add(end,-1,"day"));
};
@views:week, weekagenda
@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:

@related:
	week_view_templates.md
    weekagenda_view_templates.md

