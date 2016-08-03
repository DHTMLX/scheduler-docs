onConfirmedBeforeEventDelete
=============

@short: fires after the user clicks on the delete button and confirms the deletion (in the event's bar or details window)
	

@params: 
- id	string	the event's id
- e		Event	a native event object

@example: 
scheduler.attachEvent("onConfirmedBeforeEventDelete", function(id,e){
	//any custom logic here
    return true;
});

@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)


@template:	api_event
@descr: 
The event is blockable. Return *false* to cancel the default processing.


