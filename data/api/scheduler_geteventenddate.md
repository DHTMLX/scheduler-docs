getEventEndDate
=============

@short:gets the event's end date
	

@params:
- id	string	the event's id


@returns:
- end_date	Date	the event's end date	

@example:
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
...
scheduler.getEvent(eventId).end_date; // -> Thu May 16 2013 12:00:00
@template:	api_method
@relatedapi:
	api/scheduler_geteventstartdate.md
    api/scheduler_geteventtext.md
@descr:

@deprecated:
instead of it, you can use
~~~
var date = scheduler.getEvent(id).end_date;
~~~
