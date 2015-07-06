changeEventId
=============
@short: 
	changes the event's id

@params: 
- id	string	the current event's id
- new_id	string	the new event's id

@example: 
scheduler.changeEventId("ev15", "ev25"); //changes the event's id "ev15" -> "ev25"

@relatedapi:
	api/scheduler_onEventIdChange_event.md
@template:	api_method
@descr: 
Note, the method fires the api/scheduler_oneventidchange_event.md event.