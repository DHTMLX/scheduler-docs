map_zoom_after_resolve
=============

@short:sets the zoom that will be used to show the user's location, if the user agrees to the browser's offer to show it
	

@type: number
@default:15
@views:map

@example:
scheduler.config.map_zoom_after_resolve = 10;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");

@template:	api_config
@descr:
{{note The property requires the [map_view](extensions_list.html#mapview) plugin to be activated.}}

You can also specify the **zoom_after_resolve** setting inside the api/scheduler_map_settings_config.md configuration object.

@apigroup: Views/Map view
