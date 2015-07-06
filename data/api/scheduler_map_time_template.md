map_time
=============
@short:specifies the date in the first column of the view

@params:
- start	Date	the date when an event is scheduled to begin   
- end	Date	the date when an event is scheduled to be completed
- event	object	the event object

@views:map
@require:map_view
@example:
scheduler.templates.map_time = function(start,end,ev){
	if (ev._timed)
    	return this.day_date(ev.start_date, ev.end_date, ev) + " " + 
        this.event_date(start);
    else
		return scheduler.templates.day_date(start) + " &ndash; " + 
        scheduler.templates.day_date(end);
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:

@related:
	map_view_templates.md
