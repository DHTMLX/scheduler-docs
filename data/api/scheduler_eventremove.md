eventRemove
=============


@short: 
	removes an event handler from an HTML element
	

@params:
- id		string		the id of an event handler

@example:
var eventId = scheduler.event("divId", "click", function(e){
	do_something();
});

scheduler.eventRemove(eventId);

@relatedapi: api/scheduler_event.md


@template:	api_method
@descr:
All event listeners attached using [event](api/scheduler_event.md) will be detached automatically when the [destructor](api/scheduler_destructor.md) is called.

@changelog:
added in version 4.4
