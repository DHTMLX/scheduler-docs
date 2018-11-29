event_class
=============
@short:specifies the CSS class that will be applied to the event's container
	

@example:
scheduler.templates.event_class = function(start,end,ev){
	return "";
};
@template:	api_template
@returns:
- css_class    string     css class for related element
@descr:
In case of the Timeline view, the template is applied to 'Bar' and 'Tree' modes only.

Check the full information about customization of events colors in the related article custom_events_color.md.

@params:
- start		Date		the date when an event is scheduled to begin   
- end		Date		the date when an event is scheduled to be completed
- ev		object		the event's object

@views:day, month, week, year, units, timeline

@relatedsample: 
02_customization/01_events_coloring.html
02_customization/06_templates.html

@related:
	custom_events_color.md
	day_view_templates.md
	month_view_templates.md