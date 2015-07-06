start_on_monday
=============

@short:sets the start day of weeks
	

@type: boolean
@default:true
@views:month, week, weekagenda, year
@example:
scheduler.config.start_on_monday = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");


@template:	api_config
@descr:
If the parameter is set to *true*, a week will start from Monday (otherwise, from Sunday).

@relatedsample:
	01_initialization_loading/02_hour_scale_format.html
