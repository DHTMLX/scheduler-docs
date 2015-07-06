calendar_month
=============


@short:specifies the date in the header of the calendar

@require:minical

@params:
- date	Date	the date which needs formatting


@example:
scheduler.templates.calendar_month = scheduler.date.date_to_str("%F %Y");

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:



@related:
	mini_calendar_templates.md