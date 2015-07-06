tooltip_text
=============
@short:specifies the text of tooltips
	
@require:tooltip
@views:agenda, day, map, month, week, weekagenda, units
@params: 
- start	Date	the date when an event is scheduled to begin
- end	Date	the date when an event is scheduled to be completed
- event	object	the event object

@example:
scheduler.templates.tooltip_text = function(start,end,ev){
	return "<b>Event:</b> "+ev.text+"<br/><b>Start date:</b> " + 
    scheduler.templates.tooltip_date_format(start)+ 
    "<br/><b>End date:</b> "+scheduler.templates.tooltip_date_format(end);
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:


@relatedapi:
	 api/scheduler_tooltip_date_format_template.md
@related:
	common_templates.md#tooltips