xml_date
=============
@short:a string from an XML file is converted into a date object in conformity with this template
	
@params:
- date	Date	the string which need to be parsed
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


@related:
	loading_data.md
