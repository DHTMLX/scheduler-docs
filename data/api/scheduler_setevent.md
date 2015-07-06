setEvent
=============
@short: adds a new event to the scheduler's data pool
	

@params:
- id	string, number	the event's id
- event	object	the event object



@example:
scheduler.setEvent(1, {
    start_date: new Date(2013, 05, 16, 09, 00),
    end_date:   new Date(2013, 05, 16, 12, 00),
    text:   "Meeting",
    holder: "John", 
    room:   "5"     
});
scheduler.setCurrentView();

@template:	api_method
@related:
	adding_events.md
@relatedapi:
	api/scheduler_setcurrentview.md
    api/scheduler_addevent.md
    api/scheduler_oneventadded_event.md
    api/scheduler_oneventchanged_event.md
	
@descr:
The method is similar to api/scheduler_addevent.md.

The difference between the **setEvent()** and **addEvent()** methods is:

- The api/scheduler_addevent.md draws the event in the scheduler and invokes the api/scheduler_oneventadded_event.md / api/scheduler_oneventchanged_event.md events that can trigger  updating 
data in the original data source (e.g. database).
- The **setEvent()** method doesn't invoke any events and just adds an event to  the data pool. To draw the event in the scheduler you should call 
the  api/scheduler_setcurrentview.md method additionally.
