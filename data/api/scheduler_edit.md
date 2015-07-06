edit
=============
@short: 
	opens the inline editor to alter the event's text  (the editor in the event's box)

@params: 
- id	string		the event's id

@example:
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
...
scheduler.edit(eventId);

@template:	api_method
@relatedapi:
	api/scheduler_editstop.md
@descr: 

<img src="api/edit_method.png"/>