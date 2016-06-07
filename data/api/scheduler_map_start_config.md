map_start
================================

@short:sets the date to start displaying events from
	

@type: Date
@require:map_view
@views:map
@default: the current user's date
@example:
scheduler.config.map_start = new Date(2012, 7, 1);
scheduler.config.map_end = new Date(2014, 7, 1);
...
scheduler.init('scheduler_here', new Date(2013, 0, 10), "map");


@template:	api_config
@descr:


@relatedsample:
	03_extensions/23_map_view_timeframes.html
@relatedapi:
	api/scheduler_map_end_config.md

@apigroup: Views/Map view
