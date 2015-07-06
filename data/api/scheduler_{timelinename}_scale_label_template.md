{timelineName}_scale_label
=============

@short:specifies items of the Y-Axis
	
@params:
- key 	string 		the section's id (key)
- label 	string	the section's label
- section 	object 		the section object containing the 'key' and 'label' properties


@example:
scheduler.templates.timeline_scale_label = function(key, label, section){ 
	return label; 
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:


@require:timeline
@views:timeline


@related:
	timeline_view_templates.md
    
    
@edition:pro