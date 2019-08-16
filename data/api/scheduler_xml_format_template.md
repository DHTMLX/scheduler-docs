xml_format
=============

@short:
	a date object is converted into a string in conformity with this template. Used to send data back to the server

@params:
- date		Date		the date which needs formatting

@example:
var cfg = scheduler.config;
var	date_to_str = scheduler.date.date_to_str(cfg.xml_date, cfg.server_utc);

scheduler.templates.xml_format = function(date){
	return date_to_str(date);
};

@template:	api_template

@returns:
- text    string     a text representation of the date

@descr:

{{note The template is deprecated. Use api/scheduler_format_date_template.md instead:}}

~~~js
var dateToStr = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
scheduler.templates.format_date = function(date){
    return dateToStr (date);
};
~~~

@related:
	loading_data.md
    server_integration.md
    
@deprecated:
Use api/scheduler_format_date_template.md instead:

~~~js
var dateToStr = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
scheduler.templates.format_date = function(date){
    return dateToStr (date);
};
~~~

@changelog:
deprecated since v5.2
