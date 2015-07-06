onEventIdChange
=============
@short: fires when the id of an event is changed  
	

@params: 
- old_id	string		the initial event's id	
- new_id	string		a new event's id

@example: 
scheduler.attachEvent("onEventIdChange", function(old_id,new_id){
	//any custom logic here
});



@template:	api_event
@descr: 

Normally, the event occurs after receiving confirmation for the insert operation (changing the client-side ID to DB's ID )

