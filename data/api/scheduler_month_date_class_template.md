month_date_class
=============
@short:specifies the CSS class that will be applied to a day cell
	
@params:
- date		Date	the date which needs formatting


@views:month

@example:
scheduler.templates.month_date_class = function(date){
	return "";
};

@template:	api_template
@returns:
- css_class    string     css class for related element
@descr:


@related:
	month_view_templates.md
