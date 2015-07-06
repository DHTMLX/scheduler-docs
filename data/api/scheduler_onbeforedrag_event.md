onBeforeDrag
=============
@short: fires when the user starts the drag/resize operation (version 2.1+)

@params: 
- id	string	the event's id
- mode	string  the dragging mode: "move","resize" or "create"
- e		Event	a native event object


@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

@example:
scheduler.attachEvent("onBeforeDrag", function (id, mode, e){
	//any custom logic here
	return true;
});



@template:	api_event
@descr: 
The event fires when the user clicks inside the scheduler on the element that can be dragged. 

For the "create" mode, the id value is not provided ( a new event is not created yet ).


@relatedsample:
	03_extensions/12_readonly_form.html
    03_extensions/14_readonly_event.html