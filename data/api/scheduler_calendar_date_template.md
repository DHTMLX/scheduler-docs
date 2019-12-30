calendar_date
=============

@short:
	specifies the content of day-cells in the Mini-Calendar (date picker)

@require:minical

@params:
- date	Date	the cell's date

@example:
const dayDate = scheduler.date.date_to_str("%d");
scheduler.templates.calendar_date = function (date) {
	// show the number of events per day in a tooltip of the calendar day-cell
	const dayEnd = scheduler.date.add(date, 1, "day");
	const events = scheduler.getEvents(date, dayEnd);
	return "<div title='"+events.length+" events'>" +dayDate(date)+ "</div>";
};

@template:	api_template
@returns:
- text    string     inner html for the date cell of the Mini_calendar

@descr:

<img src="api/mini_calendar_templates.png"/>


@related:
	mini_calendar_templates.md
	minicalendar.md

@relatedapi:
	api/scheduler_calendar_month_template.md
	api/scheduler_calendar_time_template.md
	api/scheduler_calendar_scale_date_template.md