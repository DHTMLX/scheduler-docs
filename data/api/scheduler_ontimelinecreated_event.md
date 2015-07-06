onTimelineCreated
=============
@short:fires after the Timeline view has been initialized, but is not rendered on the page yet (the Timeline view only)
	

@params:
- config	object	the Timeline view config object
@example:
scheduler.attachEvent("onTimelineCreated", function (config){
    //any custom logic here
});

@template:	api_event
@descr:
The event is invoked from the api/scheduler_createtimelineview.md method.