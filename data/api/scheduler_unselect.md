unselect
=============
@short: 
	unselects the specified event

@params: 
* id	string	the event's id (if not specified, the currently selected event will be unselected)

@example: 
var eventId = scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:   "16-06-2013 12:00",
    text:   "Meeting"
});

scheduler.select(eventId);

scheduler.unselect();

@relatedapi:
	api/scheduler_select.md
@template:	api_method
@descr: 
