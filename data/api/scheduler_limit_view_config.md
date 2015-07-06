limit_view
=============
@short:limits the date period during which the user can view the events
	

@type: boolean
@require:limit
@default:false
@example:
scheduler.config.limit_view  = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");

@related:limits.md
@template:	api_config
@descr:
For example, if we set a limit on the year 2010,  we can't move to the year 2009  - only 2010 and further.
