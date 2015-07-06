onAfterEventDisplay
=============

@short: fires when the scheduler switches views, days, time etc. to show the event specified by the 'showEvent' method and fires AFTER the event is displayed
	

@params: 
- id	string	the event's id
- view	string	the name of a view used to display the event

@example: 
scheduler.attachEvent("onAfterEventDisplay", function(id,view){
	//any custom logic here
});



@template:	api_event
@descr: 




