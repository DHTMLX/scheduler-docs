getRenderedEvent
=============
@short: 
	gets the object of the currently displayed event

@returns:
-event	HTMLElement	**the event's HTML object** -  if the event is currently displayed in the scheduler. <br> **'null'** -  if the event isn't displayed in the scheduler  at the moment of calling the method.
@params: 
- id	string	 the event's id

@example: 
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
var eventObj = scheduler.getRenderedEvent(eventId);
//-> <div event_id="123649234723" ...>09:00 Meeting</div>



@template:	api_method
@descr: 
{{note
Available from version 3.5
}}






