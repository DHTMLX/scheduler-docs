limit_end
=============
@short: sets the right border of the allowable date range
	

@type:Date 
@default:null
@require:limit
@example:
scheduler.config.limit_start = new Date(2013,5,15);
scheduler.config.limit_end = new Date (2013,6,15);
...
scheduler.init('scheduler_here',new Date(2013,5,30),"week");


@template:	api_config
@descr:

@related:limits.md
@relatedsample:
	03_extensions/16_limitation.html
@relatedapi:
	api/scheduler_limit_start_config.md
