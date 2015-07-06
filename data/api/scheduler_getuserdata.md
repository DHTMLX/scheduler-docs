getUserData
=============

@short:gets the user data associated with the specified event
	
@params:
- id	string	the event's id
- name	string	the user data name

@returns:
value	any	the user data value


@example:
var eventId = scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:   "16-06-2013 12:00",
    text:   "Meeting"
});

scheduler.setUserData(eventId, "holder", "John");
...
scheduler.getUserData(eventId, "holder");// ->"John"

@template:	api_method
@relatedapi:
	api/scheduler_setuserdata.md
@descr:
