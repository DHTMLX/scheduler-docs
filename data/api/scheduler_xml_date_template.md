xml_date
=============

@short:a string from an XML file is converted into a date object in conformity with this template
	
@params:
- date		string		the string which need to be parsed

@example:
var cfg = scheduler.config;
var str_to_date = scheduler.date.str_to_date(cfg.xml_date, cfg.server_utc);

scheduler.templates.xml_date = function(date){
	return str_to_date(date);
};

@template:	api_template

@returns:
- date    Date     date object 

@descr:
{{note The template is deprecated. Use api/scheduler_parse_date_template.md instead:}}

~~~js
var cfg = scheduler.config;
var strToDate = scheduler.date.str_to_date(cfg.date_format, cfg.server_utc);
 
scheduler.templates.parse_date = function(date){
    return strToDate (date);
};
~~~

@related:
	loading_data.md

@deprecated:
Use api/scheduler_parse_date_template.md instead:

~~~js
var cfg = scheduler.config;
var strToDate = scheduler.date.str_to_date(cfg.date_format, cfg.server_utc);
 
scheduler.templates.parse_date = function(date){
    return strToDate (date);
};
~~~

@changelog:
deprecated since v5.2