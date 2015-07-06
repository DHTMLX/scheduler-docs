onBeforeEventCreated
=============
@short:fires when the user creates a new event by dragging the cursor over the scheduler
	

@params:
- e		Event	a native event object

@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)


@example:
scheduler.attachEvent("onBeforeEventCreated", function (e){
    //any custom logic here
	return true;
});

@template:	api_event
@descr:
Note, the event will fire only if the api/scheduler_drag_create_config.md configuration option is enabled.