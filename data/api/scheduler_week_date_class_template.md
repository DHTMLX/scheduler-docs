week_date_class
=============
@short:specifies the CSS class that will be applied to a day cell
	

@params:
- start	Date	the date when an event is scheduled to begin   
- end	Date	the date when an event is scheduled to be completed
- event	object	the event object

@views:week, units

@example:
scheduler.templates.week_date_class = function(start,end,ev){
	return "";
};

@template:	api_template
@returns:
- css_class    string     css class for related element
@descr:

@related:
	week_view_templates.md

