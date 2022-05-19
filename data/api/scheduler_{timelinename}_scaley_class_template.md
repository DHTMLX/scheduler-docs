{timelineName}_scaley_class
=============

@short:specifies the name of a CSS class that will be applied to items of the Y-Axis
	

@params:
- key	string 	the section's id
- label 	string	the section's label
- section	object	the section object that contains the 'key' and 'label' properties


@example:
scheduler.templates.timeline_scaley_class = function(key, label,  section){ 
	return "";
};

@template:	api_template
@returns:
- css_class    string     css class for related element
@descr:
{{note The template requires the [timeline](extensions_list.md#timeline) plugin to be activated.}}

@views:timeline


@related:
	timeline_view_templates.md

@edition:pro