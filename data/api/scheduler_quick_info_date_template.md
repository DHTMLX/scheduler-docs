quick_info_date
=============
@short:specifies the date of the pop-up edit form
	
@params: 
- start	Date	the date when an event is scheduled to begin
- end	Date	the date when an event is scheduled to be completed
- event	object	the event object


@example:
scheduler.templates.quick_info_date = function(start, end, ev){
	if (scheduler.isOneDayEvent(ev)){
		return scheduler.templates.day_date(start, end, ev) + " " +
			scheduler.templates.event_header(start, end, ev);
	}else{
		return scheduler.templates.week_date(start, end, ev);
	}
};
@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:
{{note The template requires the [quick_info](extensions_list.html#quickinfo) plugin to be activated.}}

@related:
	common_templates.md#touchsupport
    extensions_list.md#quickinfo
