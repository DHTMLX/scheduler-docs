calendar_month
=============

@short:specifies the date in the header of the Mini-Calendar (date picker)

@params:
- date	Date	the first day of a selected month


@example:

const monthLabel = scheduler.date.date_to_str("%F %Y");
scheduler.templates.calendar_month = function (date) {
	return monthLabel(date);
};

@template:	api_template
@returns:
- text    string     inner html of the month label element

@descr:

{{note The template requires the [minical](extensions_list.md#minicalendardatepicker) plugin to be activated.}} 

<img src="api/mini_calendar_templates.png"/>


@related:
	mini_calendar_templates.md
	minicalendar.md

@relatedapi:
	api/scheduler_calendar_date_template.md
	api/scheduler_calendar_time_template.md
	api/scheduler_calendar_scale_date_template.md