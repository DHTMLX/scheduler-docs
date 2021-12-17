map_start
================================

@short:sets the date to start displaying events from
	

@type: Date

@views:map
@default: the current user's date
@example:
scheduler.config.map_start = new Date(2012, 7, 1);
scheduler.config.map_end = new Date(2014, 7, 1);
...
scheduler.init('scheduler_here', new Date(2013, 0, 10), "map");


@template:	api_config
@descr:
{{note The property requires the [map_view](extensions_list.html#mapview) plugin to be activated.}}

@relatedsample:
	03_extensions/23_map_view_timeframes.html
@relatedapi:
	api/scheduler_map_end_config.md

@apigroup: Views/Map view
