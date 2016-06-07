map_zoom_after_resolve
=============

@short:sets the zoom that will be used to show the user's location, if the user agrees to the browser's offer to show it
	

@type: number
@default:15
@views:map
@require:map_view
@example:
scheduler.config.map_zoom_after_resolve = 10;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");

@template:	api_config
@descr:

@apigroup: Views/Map view
