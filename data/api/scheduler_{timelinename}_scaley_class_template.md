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

	
@require:timeline
@views:timeline


@related:
	timeline_view_templates.md

@edition:pro