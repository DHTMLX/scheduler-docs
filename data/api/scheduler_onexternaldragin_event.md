onExternalDragIn
=============

@short:fires when some data is being dragged into the scheduler from an outside DHTMLX component (only with dnd extension enabled)
	

@params: 
- id	string 	the data item id
- source	object 		the source HTML element that was dragged into the scheduler
- e		Event 	a native event object

@example: 
scheduler.attachEvent("onExternalDragIn", function (id, source, e){
	scheduler.getEvent(id).text = source.innerHTML;
    return true;
});

@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)


@require:outerdrag
@relatedapi:api/scheduler_onbeforeexternaldragin_event.md

@template:	api_event
@descr: 



- The event can be used to customize newly-created events (which are the result of drag-in operations).
- The event is blockable. Return *false*,  and dragging won't produce a new event. 


@relatedsample:
	10_integration/02_dhtmlxTree_outer_drag.html