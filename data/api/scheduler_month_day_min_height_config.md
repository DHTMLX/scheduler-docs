month_day_min_height
=============
@short:sets the minimum height of cells in the Month view
	

@type: number

@default:90
@views:month

@example:
scheduler.config.month_day_min_height = 150;
...
scheduler.init('scheduler_here',new Date(2013,5,30),"month");

@template:	api_config
@descr:
{{note The property requires the [container_autoresize](extensions_list.md#containerautoresize) plugin to be enabled.}}

@relatedapi:
	api/scheduler_month_day_config.md

@apigroup: Views/Month view
