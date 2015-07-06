onEventChanged
=============
@short: occurs after the user has edited an event and saved the changes (after clicking on the edit and save buttons in the event's bar or in the details window)
	

@params: 
- id	string	the event's id
- ev	object	the event's object

@example: 
scheduler.attachEvent("onEventChanged", function(id,ev){
	//any custom logic here
});



@template:	api_event
@descr: 



@relatedsample:
	09_api/07_highlighted_timespans_month_view.html