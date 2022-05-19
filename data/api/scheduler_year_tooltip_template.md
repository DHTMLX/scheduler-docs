year_tooltip
=============
@short:specifies the tooltip over a day cell containing some scheduled event(s)
	

@params:
@params: 
- start	Date	the date when an event is scheduled to begin
- end	Date	the date when an event is scheduled to be completed
- event	object	the event object


@views:year

@example:
scheduler.templates.year_tooltip = function(start,end,ev){
	return ev.text;
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:

{{note The template requires the [year_view](extensions_list.md#year) plugin to be activated.}}

@related:
	year_view_templates.md
