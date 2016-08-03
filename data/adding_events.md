Adding/deleting Events
===============================

Adding events
-------------------

To add an event to the scheduler, you may use one of three methods:

1. api/scheduler_addevent.md - adds a new event and invokes the api/scheduler_oneventadded_event.md or api/scheduler_oneventchanged_event.md event;
2. api/scheduler_addeventnow.md - adds a new event and opens the lightbox to confirm. Doesn't invoke any events;
3. api/scheduler_setevent.md - adds a new event to the scheduler's data pool. Doesn't invoke any events.

The most recommended way is the api/scheduler_addevent.md method:

~~~js
var eventId = scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:   "16-06-2013 12:00",
    text:   "Meeting",
    holder: "John", //userdata
    room:   "5"     //userdata
});
~~~

{{sample
	02_customization/08_validation.html
}}

{{sample
	02_customization/28_lightbox_default_value.html
}}

Updating events
--------------

There are two cases of updating events possible in Scheduler:

1. if you need just to rerender the event without sending changes to the server, use api/scheduler_updateevent.md 
2. if you need to apply and save changes on the server - it's better to choose the [addEvent](adding_events.md#addingevents) method 

~~~js
var eventId = scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:   "16-06-2013 12:00",
    text:   "Meeting"
});
 
var event = scheduler.getEvent(eventId);
event.text = "Conference"; //changes event's data

scheduler.updateEvent(event.id); // repaint without sending to the server
//or
scheduler.addEvent(event.id); // repaint and send update to the server
~~~



Deleting events
----------------------------
To delete an existing event from the scheduler, use the api/scheduler_deleteevent.md method:

~~~js
scheduler.parse([
   {id:1, start_date:"06/30/2009 09:00", end_date:"06/30/2009 12:00", text:"Task1"},
   {id:2, start_date:"06/30/2009 12:00", end_date:"06/30/2009 20:00", text:"Task2"}
],"json");
...
scheduler.deleteEvent(2);
~~~


If you have dataProcessor initialized, added to/deleted from the scheduler events will be automatically added/deleted in the data source. See the detailed information in the server_integration.md guide.

{{sample
	02_customization/16_custom_form.html
}}