map_infowindow_max_width
=============

@short:the maximum width of the map's popup marker in the Map view
	

@type: number
@default:300

@views:map

@example:
scheduler.config.map_infowindow_max_width = 350;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");


@template:	api_config
@descr:
{{note The property requires the [map_view](extensions_list.html#mapview) plugin to be activated.}}

You can also specify the **infowindow_max_width** setting inside the api/scheduler_map_settings_config.md configuration object.

@apigroup: Views/Map view

