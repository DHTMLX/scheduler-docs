year_y
=============
@short:sets the number of columns in the Year view
	

@type: number
@require:year_view
@default:3
@views:year
@example:
scheduler.config.year_x = 5;
scheduler.config.year_y = 5;
...
scheduler.init('scheduler_here',new Date(2013,0,10),"year");


@template:	api_config
@relatedapi:
	api/scheduler_year_x_config.md
@descr:

@apigroup: Views/Year view