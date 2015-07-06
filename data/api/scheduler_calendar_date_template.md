calendar_date
=============

@short:
	specifies the format of the date in a cell

@require:minical

@params:
- date	Date	the cell's date

@example:
scheduler.templates.calendar_date = scheduler.date.date_to_str("%d");
@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:


@related:
	mini_calendar_templates.md