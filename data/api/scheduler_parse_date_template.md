parse_date
=============

@short: converts date string into a Date object
	
@params:
- date		string		the string which need to be parsed

@returns:
- date    	Date    Date object

@example:
var cfg = scheduler.config;
var strToDate = scheduler.date.str_to_date(cfg.date_format, cfg.server_utc);

scheduler.templates.parse_date = function(date){
    return strToDate (date);
};


@template:	api_template


@descr:
This function is called from **scheduler.load()** or **scheduler.parse()** call to parse the *start_date/end_date* properties of events, if they are provided in the string format. 
This function can be redefined if you use a custom format that the default method can't parse. Check settings_format.md.

[Read more about date objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

@relatedapi:
api/scheduler_parse.md
api/scheduler_load.md

@related:
	loading_data.md
    settings_format.md
    server_integration.md

