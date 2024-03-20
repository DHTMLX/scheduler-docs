map_initial_position
=============
@short:sets the initial position of the map
	

@type:LatLng 
@default:google.maps.LatLng(48.724, 8.215)

@views:map

@example:
scheduler.config.map_initial_position =new google.maps.LatLng(51.477840, -0.001492);
...
scheduler.init('scheduler_here',new Date(2013,05,11),"map");


@template:	api_config
@relatedapi:
	 api/scheduler_map_initial_zoom_config.md
     
@deprecated:
instead you can use:

~~~
scheduler.config.map_settings = {
	initial_position: {
	   lat: 48.724,
	   lng: 8.215
	}
}
~~~

@descr:
{{note The property requires the [map_view](extensions_list.html#mapview) plugin to be activated.}}

@apigroup: Views/Map view
@changelog:
deprecated since v7.1
