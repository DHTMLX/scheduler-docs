{gridName}_single_date
=============

@short:specifies the format of dates in columns with id='start_date' or id='end_date'
	

@params:
- date	Date	the date which needs formatting

@example:
scheduler.templates.grid_single_date = function(date){
	return scheduler.templates.day_date(date)+" "+this.event_date(date);
};
    

@require:grid_view
@views:grid

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:

@related:
	grid_view_templates.md
@relatedapi:
	api/scheduler_{gridname}_full_date_template.md

@edition:pro