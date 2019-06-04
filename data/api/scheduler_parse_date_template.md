parse_date
=============

@short: a string is converted into a date object in conformity with this template
	
@params:
- date		Date	the string which need to be parsed

@example:
var cfg = scheduler.config;
var str_to_date = scheduler.date.str_to_date(cfg.date_format, cfg.server_utc);

scheduler.templates.parse_date = function(date){
	return str_to_date(date);
};

@template:	api_template
@returns:
- date    Date     date object 

@descr:


@related:
	loading_data.md

@todo: chek and improve

