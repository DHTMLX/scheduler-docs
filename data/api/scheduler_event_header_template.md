event_header
=============
@short:specifies the event's header
	

@example:
scheduler.templates.event_header = function(start,end,ev){
	return scheduler.templates.event_date(start)+" - "+
    scheduler.templates.event_date(end);
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:



@params:
- start	Date	the date when an event is scheduled to begin   
- end	Date	the date when an event is scheduled to be completed
- event	object	the event's object

@views:day, week, units

@related:
	day_view_templates.md
     week_view_templates.md