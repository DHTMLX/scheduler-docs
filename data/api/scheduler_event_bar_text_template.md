event_bar_text
=============
@short:specifies the event's text. Applied to multi-day events only
	

@params:
- start		Date	the date when an event is scheduled to begin  
- end	Date	the date when an event is scheduled to be completed
- event	object	the event's object

@views:month

@example:
scheduler.templates.event_bar_text = function(start,end,event){
	  return event.text;
};
@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:

@related:
	month_view_templates.md
