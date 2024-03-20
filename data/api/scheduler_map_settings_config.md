map_settings
=============

@todo:
	check 


@short:provides map-related configuration settings
	

@type: object
@views:map
@example:
scheduler.config.map_settings = {
	initial_position: {
	   lat: 48.724,
	   lng: 8.215
	},
	error_position: {
	   lat: 15,
	   lng: 15
	},
	initial_zoom: 1,
	zoom_after_resolve: 15,
	info_window_max_width: 300,
	resolve_user_location: true,
	resolve_event_location: true,
	view_provider: "googleMap"
}
...
scheduler.init('scheduler_here',new Date(2024,05,11),"map");

@template:	api_config
@descr:
{{note The property requires the [map_view](extensions_list.html#mapview) plugin to be activated.}}

You can provide custom settings for a map inside the **map_settings** object, for example some tokens:

~~~js
scheduler.config.map_settings.accessToken = "pk.eyJ...";
~~~

@changelog:
Added in v7.1