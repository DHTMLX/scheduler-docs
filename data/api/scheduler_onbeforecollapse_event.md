onBeforeCollapse
=============
@short:fires when a user clicks on the expand icon to change the scheduler's size from 'full screen' to original.
	

@example:
scheduler.attachEvent("onBeforeCollapse",function(){
	//any custom logic here
    return true;
});

@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)


@template:	api_event
@descr:
@require:expand


@relatedapi:
	api/scheduler_oncollapse_event.md
	api/scheduler_onbeforeexpand_event.md
	api/scheduler_onexpand_event.md
