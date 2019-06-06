{unitsName}_scale_text
=============
@short:specifies items of the X-Axis
	
@params:
- key 	string 		the unit's id (key)
- label 	string	the unit's label
- unit 	object 		the unit object containing the 'key' and 'label' properties
- date   Date 		the date of a column (for multi-day Units view)


@example:
scheduler.templates.unit_scale_text = function(key, label, unit, date) {
	if (option.css) {
		return "<span class='" + option.css + "'>" + label + "</span>";
	} else {
		return label;
	}
};
@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:


	
@require:units
@views:units


@related:
	units_view_templates.md

@edition:pro