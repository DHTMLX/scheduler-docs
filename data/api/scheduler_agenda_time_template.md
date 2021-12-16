agenda_time
=============
@short:specifies the date in the first column of the Agenda view
	

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler

@example:
const templates = scheduler.templates;
scheduler.templates.agenda_time = function(start, end, event){
  if (scheduler.isOneDayEvent(event)) {
    return templates.day_date(event) + " " + templates.event_date(start);
  } else {
    return templates.day_date(start) + " &ndash; " + 
        templates.day_date(end);
  }
};

@views:agenda
@params: 

- start	Date	the date when an event is scheduled to begin
- end	Date	the date when an event is scheduled to be completed
- event	object	the event object

@descr:
{{note The template requires the [agenda_view](extensions_list.md#agendaview) plugin to be activated.}}

@related:
	agenda_view_templates.md
