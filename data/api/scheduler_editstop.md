editStop
=============
@short: 
	closes the inline event editor, if it's currently open

@params: 
-id		string	the event's id

@example: 
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
...
scheduler.editStop(eventId);

@template:	api_method
@relatedapi:
	api/scheduler_edit.md
@descr: 


<img src="api/edit_stop_method.png"/>