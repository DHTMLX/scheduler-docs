calendar_scale_date
=============

@short:specifies the day name in the week sub-header of the view
	

@require:minical

@params:
- date	Date	the date which needs formatting


@example:
scheduler.templates.calendar_scale_date = scheduler.date.date_to_str("%D");

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:

@related:
	mini_calendar_templates.md