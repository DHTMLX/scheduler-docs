map_type
=============
@short: sets the type of Google Maps
	
@views:map

@default: ROADMAP
@type: MapTypeId

@example:
scheduler.config.map_type = google.maps.MapTypeId.HYBRID;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"map");

@template:	api_config
@values:
- <b>HYBRID</b> - displays a transparent layer of major streets on satellite images.
- <b>ROADMAP</b> - displays a normal street map.
- <b>SATELLITE</b> - displays satellite images.
- <b> TERRAIN</b> - displays maps with physical features such as terrain and vegetation.
@descr:
{{note The property requires the [map_view](extensions_list.html#mapview) plugin to be activated.}}

@apigroup: Views/Map view

