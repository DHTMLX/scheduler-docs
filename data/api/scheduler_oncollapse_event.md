onCollapse
=============
@short:fires when a user clicks on the expand icon to change the scheduler's size from 'full screen' to original.
	

@example:
scheduler.attachEvent("onCollapse",function(){
	//any custom logic here
});

@template:	api_event
@descr:
{{note The event requires the [expand](extensions_list.md#expand) extension to be enabled.}}


@relatedapi:
	api/scheduler_onbeforecollapse_event.md
	api/scheduler_onbeforeexpand_event.md
	api/scheduler_onexpand_event.md