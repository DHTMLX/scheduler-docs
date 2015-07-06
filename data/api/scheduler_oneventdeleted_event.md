onEventDeleted
=============

@short: fires after the specified event was deleted (version 3.0+)
	

@params: 
- id	string		the event's id

@example: 
scheduler.attachEvent("onEventDeleted", function(id){
    // custom code
});



@template:	api_event
@descr: 
The event will fire regardless of whether the DataProcessor library is used or not.

@relatedsample:
	09_api/07_highlighted_timespans_month_view.html