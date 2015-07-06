showEvent
=============
@short: 
	shows and highlights the specified event in the current or specified view

@params: 
- id	string	the event's id
* view	string  the view name 

@example: 
	
//shows the event with 'id=someId' in the Week view
scheduler.showEvent(someId,"week");

//shows the event with 'id=someId' in the currently active view
scheduler.showEvent(someId);



@template:	api_method
@relatedsample:
	09_api/08_show_event.html
@descr: 
- The names for default views are 'day', 'week', 'month'. To specify any other view - use its **name** parameter.
- The method invokes the api/scheduler_onbeforeeventdisplay_event.md and api/scheduler_onaftereventdisplay_event.md events.


For example, you programmatically add a new event and want to show it in the scheduler:

~~~js
var eventId = scheduler.addEvent({
    start_date: "08-06-2013 09:00",
    end_date:   "08-06-2013 11:00",
    text:   "Meeting"
});
...
scheduler.showEvent(eventId);
~~~
<img src="api/showEvent_method.png"/>