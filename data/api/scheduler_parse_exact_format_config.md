parse_exact_format
=============

@todo:
	check and improve


@short: defines whether scheduler automatically identifies the format of data
	

@type: boolean
@default:false
@example:
scheduler.config.parse_exact_format = true;


@template:	api_config
@descr:
By default Scheduler tries to automatically identify the format of dates passed by the user for parsing (into the [scheduler.date.str_to_date()](api/scheduler_date_other.md#strtodate) method). 
In case you want to apply the exact format specified by the user during parsing, you should enable the **parse_exact_format** config by setting it to *true*.


