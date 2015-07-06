api_date
================

@short:specifies the format of dates that are set by means of API methods. Used to parse incoming dates
	
@params:
- date	Date	the date which needs formatting

@example:
scheduler.templates.api_date = function(date){
	return scheduler.date.str_to_date(scheduler.config.api_date);
};

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:


