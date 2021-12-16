{gridName}_single_date
=============

@short:specifies the format of dates in columns with id='start_date' or id='end_date'
	

@params:
- date	Date	the date which needs formatting

@example:
scheduler.templates.grid_single_date = function(date){
	return scheduler.templates.day_date(date)+" "+this.event_date(date);
};
    
@views:grid

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:
{{note The template requires the [grid_view](extensions_list.md#gridview) plugin to be activated.}}

@related:
	grid_view_templates.md
@relatedapi:
	api/scheduler_{gridname}_full_date_template.md

@edition:pro