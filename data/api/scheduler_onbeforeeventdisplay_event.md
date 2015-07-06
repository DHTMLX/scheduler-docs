onBeforeEventDisplay
=============

@short:fires when the 'showEvent' method is called to show a specific event and fires BEFORE the event is displayed
	

@params: 
- id	string	the event's id
- view  string  the name of a view used to display the event

@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)


@example:
scheduler.attachEvent("onBeforeEventDisplay", function(id,view){
	//any custom logic here
	return true;
});



@template:	api_event
@descr: 




