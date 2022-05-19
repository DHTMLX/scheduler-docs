marker_text
=============

@short:specifies the text of the event in the Google Maps popup marker
	
@params:
- start	Date	the date when an event is scheduled to begin   
- end	Date	the date when an event is scheduled to be completed
- event	object	the event object

@views:map

@example:
scheduler.templates.marker_text = function(start,end,ev){
	 return "<div><b>" + ev.text + "</b><br/><br/>" + (ev.event_location || '') + 
     "<br/><br/>" + scheduler.templates.marker_date(start) + " - " + 
     scheduler.templates.marker_date(end) + "</div>";
};
@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:
{{note The template requires the [map_view](extensions_list.html#mapview) plugin to be activated.}}



@related:
	map_view_templates.md