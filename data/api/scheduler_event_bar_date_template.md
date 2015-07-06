event_bar_date
=============

@short:specifies the date of an event. Applied to one-day events only
	
@params:
- start		Date	the date when an event is scheduled to begin  
- end	Date	the date when an event is scheduled to be completed
- event	object	 the event object

@views:month

@example:
scheduler.templates.event_bar_date = function(start,end,ev){
	 return "• <b>"+scheduler.templates.event_date(start)+"</b> ";
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:



@related:
	month_view_templates.md