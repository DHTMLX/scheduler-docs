getEventStartDate
=============
@short:gets the event's start date
	

@params:
- id	string	the event's id

@returns:
- start_date	Date	the event's start date	


@example:
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
...
scheduler.getEvent(eventId).start_date; // -> Thu May 16 2013 09:00:00

@template:	api_method
@relatedapi:
	api/scheduler_geteventenddate.md
    api/scheduler_geteventtext.md
@descr:



@deprecated:
instead of it, you can use
~~~
var date = scheduler.getEvent(id).start_date;
~~~
