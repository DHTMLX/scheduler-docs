month_day_min_height
=============
@short:sets the minimum height of cells in the Month view
	

@type: number
@require:container_autoresize
@default:90
@views:month

@example:
scheduler.config.month_day_min_height = 150;
...
scheduler.init('scheduler_here',new Date(2013,5,30),"month");

@template:	api_config
@descr:

@relatedapi:
	api/scheduler_month_day_config.md
