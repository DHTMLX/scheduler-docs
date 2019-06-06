onDblClick
=============
@short:  fires when the user double clicks on an event
	

@params: 
- id		string	the event's id
- e	Event	a native event object

@example: 
scheduler.attachEvent("onDblClick", function (id, e){
	//any custom logic here
})

@returns:  
  - result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 
 
@template:	api_event
@descr: 
The event is blockable. Return *false* to cancel the default behaviour.

