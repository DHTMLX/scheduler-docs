map_settings
=============


@short:provides map-related configuration settings
	

@type: object
@views:map
@example:
// the example provides the default values of map settings
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

The configuration object contains the following properties:

- **initial_position** - sets the initial position of the map
- **error_position** - sets the position that will be displayed on the map in case the event's location can't be identified
- **initial_zoom** - sets the initial zoom of the map in the Map view
- **zoom_after_resolve** - sets the zoom that will be used to show the user's location, if the user agrees to the browser's offer to show it
- **info_window_max_width** - the maximum width of the map's popup marker in the Map view
- **resolve_user_location** - enables/disables prompts, asking the user to share his location for displaying on the map
- **resolve_event_location** - activates attempts to resolve the event's location, if the database doesn't have the event's coordinates stored
- **view_provider** - specifies the map provider

You can provide custom settings for a map inside the **map_settings** object, for example some tokens:

~~~js
scheduler.config.map_settings.accessToken = "pk.eyJ...";
~~~

@changelog:
Added in v7.1