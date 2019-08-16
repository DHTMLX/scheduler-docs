onBeforeEventDragIn
=============
@short:fires before a dragged event is moved over the scheduler
	

@params:
- id	string	the event's id
- e		Event	a native event object


@example:
scheduler.attachEvent("onBeforeEventDragIn", function (id, e){
	//any custom logic here
	return true;
});



@template:	api_event
@descr: 
{{note The event fires only in case of drag-n-drop between schedulers.}}

@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

@related:
dhtmlx_components_integration.md#draganddropbetweenschedulers