{gridName}_date
=============

@short:specifies the date in the header of the view
	

@params:
- start 	Date 	the start date of the view
- end 	Date 	the end date of the view

@example:
//default definition
scheduler.templates.grid_date = function(start, end){
	return scheduler.templates.day_date(start)
    + " - "
    + scheduler.templates.day_date(end);
};


@require:grid_view
@views:grid

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:

@related:
	grid_view_templates.md

@edition:pro