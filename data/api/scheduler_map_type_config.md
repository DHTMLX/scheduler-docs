map_type
=============
@short: sets the type of Google Maps
	
@views:map

@default: ROADMAP
@type: MapTypeId

@deprecated:
instead you use:
~~~
scheduler.config.map_settings = {
	type: google.maps.MapTypeId.HYBRID
}
~~~

@example:
scheduler.config.map_type = google.maps.MapTypeId.HYBRID;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"map");

@values: HYBRID,ROADMAP,SATELLITE,TERRAIN

@template:	api_config

@descr:
{{note The property requires the [map_view](extensions_list.html#mapview) plugin to be activated.}}

@apigroup: Views/Map view
@changelog:
deprecated since v7.1
