year_scale_date
=============

@short:specifies the day's name in the sub-header of a month block of the view
	
@params:
- date	Date	the date which needs formatting

@views:year

@example:
const formatScaleDate = scheduler.date.date_to_str("%D");
scheduler.templates.year_scale_date = function(date){
    return formatScaleDate(date);
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@related:
	year_view_templates.md
@descr:

{{note The template requires the [year_view](extensions_list.md#year) plugin to be activated.}}
