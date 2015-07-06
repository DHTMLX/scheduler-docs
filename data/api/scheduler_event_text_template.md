event_text
=============
@short:specifies the event's text
	

@example:
scheduler.templates.event_text = function(start,end,ev){
	return ev.text;
};


@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:



@params:
- start	Date	the date when an event is scheduled to begin   
- end	Date	the date when an event is scheduled to be completed
- event	object	the event object

@views:day, week, units
@related:
	day_view_templates.md
