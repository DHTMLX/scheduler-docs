limit_start
=============
@short:sets the left border of the allowable date range
	

@type: Date
@require:limit
@default:null
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
	api/scheduler_limit_end_config.md
