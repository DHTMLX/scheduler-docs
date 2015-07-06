templates
=============

@short:defines formatting of the templates for dates, titles and tooltips in the scheduler
	

@type:object

@example:
//specifies the date in the header of the Day and Units views
scheduler.templates.day_date = function(date){
    return scheduler.date.date_to_str(scheduler.config.default_date);
};

@template:	api_config
@descr:
The properties of the **templates** object are described in a separate chapter of <br> the root API page <a href="api/refs/scheduler.md#templates">'Scheduler API: Templates'</a>.

