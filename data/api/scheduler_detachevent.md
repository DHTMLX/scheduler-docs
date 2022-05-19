detachEvent
=============
@short: 
	detaches a handler from an event (which was attached before by the attachEvent method)

@params: 
- id	string	the event's id

@example: 
var myEvent = scheduler.attachEvent("onClick", function (id){
    ...//event handler code
});
...
scheduler.detachEvent(myEvent);	


@template:	api_method
@relatedapi:
	 api/scheduler_attachevent.md
@descr: 

All event listeners attached using [event](api/scheduler_event.md) will be detached automatically when the [destructor](api/scheduler_destructor.md) is called.


