parse_exact_format
=============

@short: defines whether scheduler automatically identifies the format of data
	

@type: boolean
@default:false
@example:


scheduler.config.parse_exact_format = true;
var parseDate = scheduler.date.str_to_date("%Y-%m-%d %H:%i");
// the date string must match the exact format

parseDate("2019-01-15 12:00");
// -> Tue Jan 15 2019 12:00:00

parseDate("15-01-2019 12:00");
// -> Sun Jul 11 1920 12:00:00 

parseDate("2019-01-15T12:00");
// -> Invalid Date


scheduler.config.parse_exact_format = false;
var parseDate = scheduler.date.str_to_date("%Y-%m-%d %H:%i");
// scheduler will try to detect the provided date string format

parseDate("2019-01-15 12:00");
// -> Tue Jan 15 2019 12:00:00

parseDate("15-01-2019 12:00");
// -> Tue Jan 15 2019 12:00:00  

parseDate("2019-01-15T12:00");
// -> Tue Jan 15 2019 12:00:00  

@related:
	date_formats.md

@template:	api_config
@descr:
By default Scheduler tries to automatically identify the format of dates passed by the user for parsing (into the [scheduler.date.str_to_date()](api/scheduler_date_other.md#strtodate) method). 
In case you want to apply the exact format specified by the user during parsing, you should enable the **parse_exact_format** config by setting it to *true*.


