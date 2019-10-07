calendar_scale_date
=============

@short: specifies the format of week-days in the header of the Mini-Calendar datepicker
	

@require:minical

@params:
- date	Date	the date of a week-day for a header cell


@example:

const weekDayLabel = scheduler.date.date_to_str("%D");
scheduler.templates.calendar_scale_date = function (date) {
	// M | T | W | T | F | S | S
	return weekDayLabel(date).substr(0, 1);
};

@descr:

<img src="api/mini_calendar_templates.png"/>

@template:	api_template
@returns:
- text    string     inner html string for the header cell

@related:
	mini_calendar_templates.md
	minicalendar.md

@relatedapi:
	api/scheduler_calendar_date_template.md
	api/scheduler_calendar_month_template.md
	api/scheduler_calendar_time_template.md