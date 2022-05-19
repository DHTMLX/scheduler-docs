week_agenda_event_text
=============
@short:specifies the event's text
	


@params: 
- start	Date	the date when an event is scheduled to begin
- end	Date	the date when an event is scheduled to be completed
- event	object	the event object
- cellDate	Date	the date of a day cell that a one-day event or a single occurrence of <br> the recurring event displays in
- pos	string	the position of a single occurrence in the recurring event: 'start' - the first occurrence, 'end' - the last occurrence, 'middle' - for remaining occurrences


@example:
scheduler.templates.week_agenda_event_text = function(start,end,event,cellDate,pos){
	return scheduler.templates.event_date(start_date) + " " + event.text;
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:
{{note The template requires the [week_agenda](extensions_list.md#weekagenda) plugin to be activated.}}

@views: weekagenda

@related:
	weekagenda_view_templates.md
    
@edition:pro