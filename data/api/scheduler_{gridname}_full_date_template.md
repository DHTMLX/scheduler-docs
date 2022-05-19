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

@views:grid

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:
{{note The template requires the [grid_view](extensions_list.md#gridview) plugin to be activated.}}

@related:
	grid_view_templates.md
@relatedapi:
	api/scheduler_{gridname}_single_date_template.md

@edition:pro