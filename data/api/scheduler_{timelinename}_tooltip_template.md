{timelineName}_tooltip
=============
@short:specifies the tooltip over a day cell containing some scheduled event(s)
	

@params:
- start		Date	the date when an event is scheduled to begin  
- end	Date	the date when an event is scheduled to be completed
- event	object	 the event object

@example:
scheduler.templates.timeline_tooltip = function(start,end,event){
	return event.text;
};
@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:


	
@require:timeline
@views:timeline


@related:
	timeline_view_templates.md

@edition:pro