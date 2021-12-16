week_agenda_scale_date
=============
@short: the date of a day cell of the view

@params:
- date	Date	the date which needs formatting
	

@type:

@example:
scheduler.templates.week_agenda_scale_date = function(date) {
		var scale_date_format = scheduler.date.date_to_str("%l, %F %d");
		return scale_date_format(date);
};
    
@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:
{{note The template requires the [week_agenda](extensions_list.md#weekagenda) plugin to be activated.}}

@related:
	weekagenda_view_templates.md

@views:weekagenda

@edition:pro