onBeforeEventDisplay
=============

@short: fires when the 'showEvent' method is called to show a specific event and fires BEFORE the event is displayed
	

@params: 
- event		object		the event's object
- view  	string  	the name of a view used to display the event

@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)


@example:
scheduler.attachEvent("onBeforeEventDisplay", function(event,view){
	//any custom logic here
	return true;
});



@template:	api_event
@descr: 


@relatedapi:
api/scheduler_onaftereventdisplay_event.md

