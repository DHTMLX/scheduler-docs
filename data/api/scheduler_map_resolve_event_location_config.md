map_resolve_event_location
=============

@short: activates attempts to resolve the event's location, if the database doesn't have  the event's coordinates stored
	

@type: boolean
@default:true
@require:map_view
@views:map

@example:
scheduler.config.map_resolve_event_location = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");

@template:	api_config
@descr:



- If the option is set to *true*, and an event in the database doesn't have the 'lat' and 'lng' values, the scheduler will make an attempt to resolve coordinates based on the
'event_location' value while loading events to the scheduler. If the specified location will
be identified, the corresponding coordinates will be saved in the DB. If not, the scheduler will fire the  api/scheduler_onlocationerror_event.md event.
- Enabling the property is useful for migration, but not for production stage.

@apigroup: Views/Map view
