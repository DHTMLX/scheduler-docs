year_tooltip
=============
@short:specifies the tooltip over a day cell containing some scheduled event(s)
	

@params:
@params: 
- start	Date	the date when an event is scheduled to begin
- end	Date	the date when an event is scheduled to be completed
- event	object	the event object


@views:year
@require:year_view

@example:
scheduler.templates.year_tooltip = function(start,end,ev){
	return ev.text;
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:

@related:
	year_view_templates.md
