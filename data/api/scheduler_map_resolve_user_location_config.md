map_resolve_user_location
=============

@short:enables/disables prompts asking the user to share his location for displaying on the map
	

@type: boolean
@default:true

@views:map

@example:
scheduler.config.map_resolve_user_location = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");

@template:	api_config
@descr:
{{note The property requires the [map_view](extensions_list.html#mapview) plugin to be activated.}}

You can also specify the **resolve_user_location** setting inside the api/scheduler_map_settings_config.md configuration object.

Some browsers open up the opportunity to determine the user's location. And if this option is set to *true*, such an opportunity will be offered while the map is being loaded.

@apigroup: Views/Map view

