select
=============
@short: 
	selects the specified event

@params: 
- id	string	the event's id

@example: 
var eventId = scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:   "16-06-2013 12:00",
    text:   "Meeting"
});

scheduler.select(eventId);

@relatedapi:
	api/scheduler_unselect.md
@template:	api_method
@descr: 
