map_view_provider
=============

@short:specifies the map provider 
	

@type: string
@views:map
@values: "googleMap"|"openStreetMaps"|"mapbox"
@example:
scheduler.config.map_view_provider = "googleMap";
...
scheduler.init('scheduler_here',new Date(2024,05,11),"map");

@template:	api_config
@descr:
{{note The property requires the [map_view](extensions_list.html#mapview) plugin to be activated.}}

You can also specify the map provider inside the api/scheduler_map_settings_config.md configuration object.

@changelog:
added in v7.1

