onEventCancel
=============

@short:fires when the user clicks on the 'Cancel' button in the lightbox (edit form)
	

@params: 
- id	string		the event's id
- flag	boolean 	returns 'true', if the user is cancelling a new event,<br> 'false' - if the edited event already exists


@example: 
scheduler.attachEvent("onEventCancel", function(id, flag){
	//any custom logic here
});



@template:	api_event
@descr: 


