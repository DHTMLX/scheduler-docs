map_initial_zoom
=============
@short:sets the initial zoom of Google Maps in the Map view
	

@type: number
@default:1

@views:map
@example:
scheduler.config.map_initial_zoom = 7;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");

@template:	api_config
@relatedapi:
	api/scheduler_map_initial_position_config.md
@descr:
{{note The property requires the [map_view](extensions_list.html#mapview) plugin to be activated.}}

@apigroup: Views/Map view

