year_date
=============
@short:specifies the date in the header of the view
	
@params:
- date	Date	the date which needs formatting

@views:year
@require:year_view
@example:
var date_to_str=scheduler.date.date_to_str(scheduler.locale.labels.year_tab +" %Y");

scheduler.templates.year_date = function(date){
	return date_to_str(date);
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:

@related:
	year_view_templates.md

