{unitsName}_second_scale_date
=============
@short:specifies items of the second X-Axis
	
@params:
- date	Date	the date which needs formatting

@example:
scheduler.templates.units_second_scale_date = function(date){
	return scheduler.templates.week_scale_date(date);
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:


	
@require:units
@views:timeline


@related:
	units_view_templates.md
    
@edition:pro