setEventEndDate
=============
@short: 
	sets the event's end date 

@params: 
- id	string	the event's id
- date	Date	the new end date of the event

@example: 
var eventId = scheduler.addEvent({
    start_date: new Date(2013,1,10),
    end_date:   new Date(2013,1,13),
    text:   "Conference"
});
...
scheduler.getEvent(eventId).end_date = new Date(2013,1,15);	
scheduler.updateEvent(eventId);


@template:	api_method



@deprecated:
instead of it, you can use
~~~
//to set new end date
scheduler.getEvent(id).end_date = new Date();
//to update visible event box after it
scheduler.updateEvent(id);
~~~


@relatedapi:
	api/scheduler_seteventstartdate.md
	