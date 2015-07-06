onEventDrag
=============
@short:fires when the user drags/resizes events in the scheduler 
	

@params:
- id	string	the event's id
- mode	string  the dragging mode: "move","resize" or "new-size" (creating new events)
- e		Event	a native event object


@example:
scheduler.attachEvent("onEventDrag", function (id, mode, e){
	//any custom logic here
	return true;
});



@template:	api_event
@descr: 
Modes description:

- **move** - the user drags the event over the scheduler.
- **resize** - the user resizes the event by drag-and-drop.
- **new-size** - the user creates a new event by drag-and-drop.


@relatedsample:
	03_extensions/12_readonly_form.html
    03_extensions/14_readonly_event.html