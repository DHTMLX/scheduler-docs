year_month
=============

@short:specifies the month's name in the header of a month block of the view.
	
@params:
- date	Date	the date which needs formatting

@views:year
@require:year_view

@example:
const formatMonth = scheduler.date.date_to_str("%F");
scheduler.templates.year_month = function(date){
    return formatMonth(date);
};
@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@related:
	year_view_templates.md
@descr:


