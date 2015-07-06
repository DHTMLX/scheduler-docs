onViewChange
=============
@short:fires after the current view has been changed to some other one
	

@params: 
- new_mode		string	a new view
- new_date		object	a new date

@example: 
scheduler.attachEvent("onViewChange", function (new_mode , new_date){
	//any custom logic here
});



@template:	api_event
@descr: 
The event is called each time the current view is changed.

