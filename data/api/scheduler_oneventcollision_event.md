onEventCollision
=============
@short:fires when the user tries to create a new event  (or modify some existing one) inside of some already occupied time slot
	

@params: 
- ev	object	 the event object
- evs	array	 a collection of events' objects which already occupy the same time-slot

@example: 
scheduler.attachEvent("onEventCollision", function (ev, evs){
	//any custom logic here
    return true;
});

@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

@require:collision
@template:	api_event
@descr: 
Returning <i>true</i> from the handler function blocks the event from being added/edited. Returning <i>false</i>  - allows the collision, i.e. adding/editing events.

