onEventUnselected
=============


@short: fires when the user unselects an event by selecting some other event
	

@params:
- id	string	the event's id (of the unselected event)

@example:
scheduler.attachEvent("onEventUnselected", function(id){
    //any custom logic here
});

@template:	api_event
@descr:

@relatedapi: api/scheduler_oneventselected_event.md