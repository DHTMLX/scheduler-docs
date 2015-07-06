lightbox_header
=============
@short: specifies the lightbox's header
	
@params:
- start	Date	the date when an event is scheduled to begin   
- end	Date	the date when an event is scheduled to be completed
- event	object	the event object

@example:
scheduler.templates.lightbox_header = function(start,end,ev){
    return scheduler.templates.event_header(ev.start_date,ev.end_date,ev) 
    + scheduler.templates.event_bar_text(ev.start_date,ev.end_date,ev);
};
@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:
Note, if the [lightbox_header](api__scheduler_lightbox_header_template.html) template isn't specified, the date part of the header will be set according to the [event_header](api__scheduler_event_header_template.html) template.

@related:
	common_templates.md#lightbox