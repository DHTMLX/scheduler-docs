onEventDragIn
=============

@short:fires when a dragged event is moved into the scheduler
	

@params:
- id	string	the event's id
- e		Event	a native event object


@example:
scheduler.attachEvent("onEventDragIn", function (id, e){
	//any custom logic here
});



@template:	api_event
@descr: 
{{note The event fires only in case of drag-n-drop between schedulers.}}


@related:
dhtmlx_components_integration.md#draganddropbetweenschedulers
