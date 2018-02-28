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
@related:
	loading_data.md
    server_integration.md


