setEventText
=============
@short: 
	sets the event's text

@params: 
- id	string	the event's id
- text	string	the new text of the event

@example: 
var eventId = scheduler.addEvent({
    start_date: new Date(2013,1,10),
    end_date:   new Date(2013,1,13),
    text:   "Conference"
});
...
scheduler.getEvent(eventId).text = "Meeting";
scheduler.updateEvent(eventId);

@template:	api_method

@deprecated:
instead of it, you can use
~~~
//to set new end date
scheduler.getEvent(id).text = "New text";
//to update visible event's box after it
scheduler.updateEvent(id);
~~~

@descr: 

@relatedapi:
	api/scheduler_geteventtext.md