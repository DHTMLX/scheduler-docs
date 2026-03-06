---
title: "Adding/Deleting Events"
sidebar_label: "Adding/Deleting Events"
---

# Adding/Deleting Events

## Adding events

To add an event to Scheduler, you can use one of three methods:

1. [addEvent](api/method/addevent.md) - adds a new event and invokes the [onEventAdded](api/event/oneventadded.md) or [onEventChanged](api/event/oneventchanged.md) event;
2. [addEventNow](api/method/addeventnow.md) - adds a new event and opens the lightbox to confirm. Doesn't invoke any events;
3. [setEvent](api/method/setevent.md) - adds a new event to the scheduler's data pool. Doesn't invoke any events.

The recommended way is the [addEvent](api/method/addevent.md) method:

~~~js
const eventId = scheduler.addEvent({
    start_date: new Date(2026, 5, 16, 9, 0),
    end_date:   new Date(2026, 5, 16, 12, 0),
    text: "Meeting",
    holder: "John", // custom data
    room: "5"       // custom data
});
~~~


[Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)


[Default values for lightbox controls](https://docs.dhtmlx.com/scheduler/samples/02_customization/28_lightbox_default_value.html)


## Updating events

There are two common ways to update events in Scheduler:

1. If you only need to re-render the event on the client, use [updateEvent](api/method/updateevent.md).
2. If you need to apply and save changes on the server (e.g., via dataProcessor), call [addEvent](guides/adding-events.md#adding-events) after updating the event object.

~~~js
const eventId = scheduler.addEvent({
    start_date: new Date(2026, 5, 16, 9, 0),
    end_date:   new Date(2026, 5, 16, 12, 0),
    text: "Meeting"
});
 
const event = scheduler.getEvent(eventId);
event.text = "Conference"; // change event data

scheduler.updateEvent(event.id); // repaint without sending to the server
//or
scheduler.addEvent(event.id); // repaint and send update to the server
~~~


## Deleting events

To delete an existing event from the scheduler, use the [deleteEvent](api/method/deleteevent.md) method:

~~~js
const data = [
    { id: 1, start_date: "2026-04-01 09:00", end_date: "2026-04-01 12:00", text: "Task1" },
    { id: 2, start_date: "2026-04-02 12:00", end_date: "2026-04-02 20:00", text: "Task2" }
];

scheduler.parse(data);
...
scheduler.deleteEvent(2);
~~~


If you have dataProcessor initialized, events added to or deleted from Scheduler are automatically synced with the data source. See the detailed information in the [Server-Side Integration](guides/server-integration.md) guide.


[Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
