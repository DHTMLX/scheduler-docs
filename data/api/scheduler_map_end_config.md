map_end
=============

@short:sets the date to display events until
	

@type: Date
@require:map_view
@views:map
@default: 'map_start' (value) + 1 year
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
	api/scheduler_map_start_config.md

@apigroup: Views/Map view
