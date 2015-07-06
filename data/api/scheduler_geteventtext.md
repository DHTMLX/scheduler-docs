getEventText
=============
@short:gets the event's text
	

@params:
- id	string	the event's id

@returns:
- start_date	string	the event's text


@example:
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
...
scheduler.getEvent(eventId).text; // -> "Meeting"

@template:	api_method
@relatedapi:
	api/scheduler_geteventenddate.md
    api/scheduler_geteventstartdate.md
@descr:


@deprecated:
instead of it, you can use
~~~
var text = scheduler.getEvent(id).text;
~~~
