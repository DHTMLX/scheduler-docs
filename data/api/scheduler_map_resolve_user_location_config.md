map_resolve_user_location
=============
@short:enables/disables prompts asking the user to share his location for displaying on the map
	

@type: boolean
@default:true
@require:map_view
@views:map

@example:
scheduler.config.map_resolve_user_location = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");

@template:	api_config
@descr:
Some browsers open up the opportunity to determine the user's location. And if this option is set to *true*, such opportunity will be offered while the map is being loaded.

@apigroup: Views/Map view

