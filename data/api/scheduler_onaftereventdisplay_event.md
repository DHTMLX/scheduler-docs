onAfterEventDisplay
=============

@short: fires when the scheduler switches views, days, time etc. to show the event specified by the 'showEvent' method and fires AFTER the event is displayed
	

@params: 
- event		object		the event's object
- view		string		the name of a view used to display the event


@example: 
scheduler.attachEvent("onAfterEventDisplay", function(event,view){
	//any custom logic here
});



@template:	api_event
@descr: 


@relatedapi:
api/scheduler_onbeforeeventdisplay_event.md

