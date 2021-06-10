onEventDropOut
=============

@short:fires when a dragged event  is dropped onto the area out of the scheduler
	

@params:
- id		string			the event's id 
- ev		object			the event's object
- to 		object			the target scheduler(null, if dropped to an empty area)
- e 		Event 			a native event object


@example:
scheduler.attachEvent("onEventDropOut", function (id, ev, to, e){
	//any custom logic here
});



@template:	api_event
@descr: 
{{note The event fires only in case of drag-n-drop between schedulers.}}

@related:
dhtmlx_components_integration.md#draganddropbetweenschedulers
