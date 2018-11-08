onDragEnd
=============

@short:fires when the drag/resize operation is finished
	
@params:
- id	string	the event's id
- mode	string  the dragging mode: "move","resize" or "create"
- e		Event	a native event object
    
@example:
var dragged_event;
scheduler.attachEvent("onBeforeDrag", function (id, mode, e){
	// use it to get the object of the dragged event
	dragged_event = scheduler.getEvent(id); 
	return true;
});

scheduler.attachEvent("onDragEnd", function(id, mode, e){
	var event_obj = dragged_event;
	// your custom logic
});



@relatedapi: 
	api/scheduler_onbeforedrag_event.md
@template:	api_event
@descr:

