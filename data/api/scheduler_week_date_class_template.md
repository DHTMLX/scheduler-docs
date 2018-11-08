week_date_class
=============

@short: specifies the CSS class that will be applied to a day cell
	

@params:
- start		Date	the start date of the column
- today		Date	the current date

@views:week, units

@example:
scheduler.templates.week_date_class = function(start, today){
	return "";
};

@template:	api_template
@returns:
- css_class    string     css class for related element

@descr:

@related:
	week_view_templates.md

