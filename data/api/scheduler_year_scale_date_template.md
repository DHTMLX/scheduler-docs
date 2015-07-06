year_scale_date
=============

@short:specifies the day's name in the sub-header of a month block of the view
	
@params:
- date	Date	the date which needs formatting

@views:year
@require:year_view

@example:
scheduler.templates.year_scale_date = function(date){
	return scheduler.date.date_to_str("%D");
};


@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@related:
	year_view_templates.md
@descr:


