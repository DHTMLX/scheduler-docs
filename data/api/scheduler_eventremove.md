eventRemove
=============


@todo: check

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
@changelog:
added in version 4.4
