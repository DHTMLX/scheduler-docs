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

@views:grid

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:

{{note The template requires the [grid_view](extensions_list.md#gridview) plugin to be activated.}}

@related:
	grid_view_templates.md

@edition:pro