{unitsName}_date
=============
@short:specifies the date in the header of the view
	

@params:
@params:
- date	Date	the date which needs formatting


@example:
scheduler.templates.unit_date = function(date){
		return scheduler.templates.day_date(date);
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:
{{note The template requires the [units](extensions_list.md#units) plugin to be activated.}}


@views:units


@related:
	units_view_templates.md

@edition:pro