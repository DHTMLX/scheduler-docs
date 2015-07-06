event_date
=============

@short: specifies the time part of the start and end dates of the event. Mostly used by other templates for presenting time periods

@params:
- date	Date	the date which needs formatting
@example:
scheduler.templates.event_date = function(date){
	var formatFunc = scheduler.date.date_to_str(scheduler.config.hour_date);
    return formatFunc(date);
}

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:

@related:
	common_templates.md#lightbox
