map_text
=============
@short:specifies the text in the second column of the view
	

@params:
- start	Date	the date when an event is scheduled to begin   
- end	Date	the date when an event is scheduled to be completed
- event	object	the event object

@views:map

@example:
scheduler.templates.map_text = function(start,end,ev){
	return ev.text;
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:

{{note The template requires the [map_view](extensions_list.html#mapview) plugin to be activated.}}

Note, if the [map_text](api__scheduler_map_text_template.html) template isn't specified, the 'd-m-y' part of the date in the Google Maps popup marker will be set according to the [day_date](api__scheduler_day_date_template.html) template.

@related:
	map_view_templates.md
