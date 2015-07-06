onBeforeEventChanged
=============
@short:  fires when the event has been changed by drag-n-drop, but the changes aren't saved yet.
	

@params: 
- ev	object	the event's data object after changes
- e	Event	a native event object
- is_new  boolean	 	returns 'true', if the user changes a new event. 'false' - if the edited <br> event already exists
- original	object	the event's data object before changes

@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)


@example:
scheduler.attachEvent("onBeforeEventChanged", function(ev, e, is_new, original){
	//any custom logic here
    return true;
});



@template:	api_event
@descr: 
The event occurs when a new "event" is added or an existing one is changed by drag-n-drop action.


- Beware that the 1st parameter of the handler function takes the data item object, not the data item's id (because newly created data items may not have ID yet).
- Unmodified event would be an empty object in case of creating new data items.
- The event is blockable: returning *false* from the handler will prevent data update.
