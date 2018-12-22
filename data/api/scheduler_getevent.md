getEvent
=============
@short: 
	returns the event object by its id

@params: 
	- event_id  string, number   the  event's id

@returns:
- obj	object	the event object

@example: 
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
...	
var eventObj = scheduler.getEvent(eventId); 



@template:	api_method
@relatedsample:
	02_customization/16_custom_form.html
    08_shared_events/user_1_combined.html
@descr: 




