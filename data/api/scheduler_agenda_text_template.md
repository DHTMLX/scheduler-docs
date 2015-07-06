agenda_text
=============
@short:specifies the text in the second column of the Agenda view
	

@require:agenda_view
@example:
scheduler.templates.agenda_text = function(start,end,ev){
	 return ev.text;
};

@views:agenda
@params: 
- start	Date	the date when an event is scheduled to begin
- end	Date	the date when an event is scheduled to be completed
- event	object	the event object

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@related:
	agenda_view_templates.md
@descr:
Note, if the **agenda_text** template isn't specified, 
the 'd-m-y' part of the date will be set according to the [day_date](api__scheduler_day_date_template.html) template. 




