week_agenda_date
=============


@short:
	specifies the date in the header of the Week Agenda view

@params:
- start 	Date 	the start date of the view
- end 	Date 	the end date of the view

@example:
scheduler.templates.week_agenda_date = function(start, end){
    return scheduler.templates.day_date(start)+" &ndash; "+
    scheduler.templates.day_date(scheduler.date.add(end,-1,"day"));
};

@template:	api_template
@descr:
{{note The template requires the [week_agenda](extensions_list.md#weekagenda) plugin to be activated.}}

@related:
	weekagenda_view_templates.md

@views:weekagenda

@edition:pro

@changelog: added in v6.0