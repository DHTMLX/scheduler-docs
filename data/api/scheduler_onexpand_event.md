onExpand
=============
@short:fires when a user clicks on the expand icon to change the scheduler's size from original to 'full screen'.
	

@example:
scheduler.attachEvent("onExpand",function(){
	//any custom logic here
});

@template:	api_event
@descr:
{{note The event requires the [expand](extensions_list.md#expand) extension to be enabled.}}


@relatedapi:
	api/scheduler_onbeforeexpand_event.md
	api/scheduler_onbeforecollapse_event.md
	api/scheduler_oncollapse_event.md