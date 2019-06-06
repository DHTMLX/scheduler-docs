parse_date
=============

@short: converts date string into a [Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
	
@params:
- date		string	the string which need to be parsed

@example:
var cfg = scheduler.config;
var strToDate = scheduler.date.str_to_date(cfg.date_format, cfg.server_utc);

scheduler.templates.parse_date = function(date){
    return strToDate (date);
};


@template:	api_template
@returns:
- date    Date     date object 

@descr:
This function is called from **scheduler.load()** or **scheduler.parse()** call to parse the *start_date/end_date* properties of events, if they are provided in the string format. 
This function can be redefined if you use a custom format that the default method can't parse. Check settings_format.md.

@relatedapi:
api/scheduler_parse.md
api/scheduler_load.md

@related:
	loading_data.md
    settings_format.md
    server_integration.md

