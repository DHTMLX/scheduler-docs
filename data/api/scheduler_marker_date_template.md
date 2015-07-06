marker_date
=============

@short:specifies the date of the event in the Google Maps popup marker
	

@params:
- start	Date	the date when an event is scheduled to begin   
- end	Date	the date when an event is scheduled to be completed
- event	object	the event object

@require:map_view
@views:map

@example:
scheduler.templates.marker_date = function(date){
	return scheduler.date.date_to_str("%Y-%m-%d %H:%i"); 
};


@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:

@related:
	map_view_templates.md


