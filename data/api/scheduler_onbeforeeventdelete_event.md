onBeforeEventDelete
=============
@short:fires after the user clicks on the delete button (in the event bar or details window)
	

@params: 
- id	string	the event's id
- e		Event	a native event object

@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)


@example:
scheduler.attachEvent("onBeforeEventDelete", function(id,e){
	//any custom logic here
	return true;
});


@template:	api_event
@descr: 
The event is blockable. Return *false* to cancel the default processing.


