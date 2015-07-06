{gridName}_full_date
=============


@short: specifies the format of dates in columns with id='date'
	
@params:
- start		Date	the date when an event is scheduled to begin  
- end	Date	the date when an event is scheduled to be completed
- ev	object	the event object


@example:
scheduler.templates.grid_full_date = function(start,end,event){
	if (scheduler.isOneDayEvent(event))
		return scheduler.templates.grid_single_date(start);
	else
		return scheduler.templates.day_date(start)+" &ndash; "
   		+scheduler.templates.day_date(end);
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
	api/scheduler_{gridname}_single_date_template.md

@edition:pro