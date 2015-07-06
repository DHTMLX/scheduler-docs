onDragEnd
=============

@short:fires when the drag/resize operation is finished
	
@example:
var dragged_event;
scheduler.attachEvent("onBeforeDrag", function (id, mode, e){
	dragged_event=scheduler.getEvent(id); //use it to get the object of the dragged event
	return true;
});

scheduler.attachEvent("onDragEnd", function(){
	var event_obj = dragged_event;
	//your custom logic
});





@relatedapi: 
	api/scheduler_onbeforedrag_event.md
@template:	api_event
@descr:

