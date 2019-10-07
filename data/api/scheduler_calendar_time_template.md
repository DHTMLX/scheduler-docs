calendar_time
=============
@short: specifies the date format of the lightbox's start and end date inputs
	

@params:
- date	Date	the date which needs formatting

@example:
scheduler.templates.calendar_time = scheduler.date.date_to_str("%d-%m-%Y");

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler

@descr:
<img src="api/mini_calendar_templates.png"/>

@related:
	mini_calendar_templates.md
	minicalendar.md

@relatedapi:
	api/scheduler_calendar_date_template.md
	api/scheduler_calendar_month_template.md
	api/scheduler_calendar_scale_date_template.md