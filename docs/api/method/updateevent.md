---
sidebar_label: updateEvent
title: "updateEvent method"
description: "updates the specified event"
---

# updateEvent

### Description

@short: Updates the specified event

@signature: updateEvent: (id: string) =\> void

### Parameters

- `id` - (required) *string* - the event's id

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:   "16-06-2013 12:00",
    text:   "Meeting"
});
 
scheduler.getEvent(eventId).text = "Conference"; //changes event's data
scheduler.getEvent(id).start_date = new Date();   //sets new start date
scheduler.updateEvent(id);   // renders the updated event
~~~

### Related samples
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
- [Creating message boxes](https://docs.dhtmlx.com/scheduler/samples/09_api/02_dhtmlx_message.html)

### Related API
- [getEvent](api/method/getevent.md)

### Related Guides
- [Server-Side Integration](guides/server-integration.md#technique)
