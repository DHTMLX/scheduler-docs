map_error_position
=============
@short:sets the position that will be displayed on the map in case the event's location can't be identified 
	

@type:LatLng

@views:map
@default:google.maps.LatLng(15, 15)
@example:
scheduler.config.map_error_position = new google.maps.LatLng(51.477840, -0.001492);
...
scheduler.init('scheduler_here',new Date(2013,05,11),"map");


@template:	api_config
@relatedapi:
	api/scheduler_map_resolve_event_location_config.md

@deprecated:
instead you can use:
~~~
scheduler.config.map_settings = {
	error_position: {
	   lat: 15,
	   lng: 15
	}
}
~~~

@descr:
{{note The property requires the [map_view](extensions_list.html#mapview) plugin to be activated.}}

The 'error position' will be applied in 2 cases:

1. An event doesn't have one of the coordinates (or both of them) specified (i.e. a coordinate has value '0', 'null', 'undefined') and the api/scheduler_map_resolve_event_location_config.md option is disabled.
2. An event doesn't have one of coordinates (or both of them) specified and the api/scheduler_map_resolve_event_location_config.md option is enabled, but the scheduler can't resolve the location.

@apigroup: Views/Map view
@changelog:
deprecated since v7.1
