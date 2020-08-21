updateEvent
=============
@short: updates the specified event

@params: 
- id	string	the event's id

@example: 
var eventId = scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:   "16-06-2013 12:00",
    text:   "Meeting"
});
 
scheduler.getEvent(eventId).text = "Conference"; //changes event's data
scheduler.getEvent(id).start_date = new Date();   //sets new start date
scheduler.updateEvent(id);   // renders the updated event



@template:	api_method
@relatedapi:
	api/scheduler_getevent.md
@relatedsample:
	03_extensions/01_recurring_events.html
    09_api/02_dhtmlx_message.html
@related:
	server_integration.md#updatingdata
@descr: 







