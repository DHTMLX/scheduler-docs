{timelineName}_second_scalex_class
=============

@short:specifies the name of a CSS class that will be applied to items of the second X-Axis
	

@params:
- date	Date 	the date which needs formatting

@views:timeline

@example:
scheduler.templates.timeline_second_scalex_class = function(date){
	return "";
};

@template:	api_template
@returns:
- css_class    string     css class for related element
@descr:
{{note The template requires the [timeline](extensions_list.md#timeline) plugin to be activated.}}

@related:
	timeline_view_templates.md

@edition:pro