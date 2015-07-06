load_format
=============
@short: specifies the format of requests in the dynamic loading mode
	

@params:
- date	Date	the date which needs formatting

@example:
scheduler.templates.load_format = function(date){
	var dateToStr_func = scheduler.date.date_to_str(scheduler.config.load_date);
    return  dateToStr_func(date);
    
}

@template:	api_template
@returns:
- text    string     html text for rendering in the scheduler
@descr:

The default format of  requests is:

~~~js
some.php?from=DATEHERE&to=DATEHERE
~~~

where DATEHERE - a valid date value in the format defined by the api/scheduler_load_date_config.md option *(according to the default definition of the **load_format** template).*

@relatedapi:
	api/scheduler_setloadmode.md
    api/scheduler_load_date_config.md
@related:
	loading_data.md#dynamicloading