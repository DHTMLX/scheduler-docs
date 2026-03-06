---
sidebar_label: "updateEvent"
title: "updateEvent method"
description: "ändert das angegebene Event"
---

# updateEvent

### Description

@short: Ändert das angegebene Event

@signature: updateEvent: (id: string) =\> void

### Parameters

- `id` - (required) *string* - die ID des Events

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:   "16-06-2013 12:00",
    text:   "Meeting"
});
 
scheduler.getEvent(eventId).text = "Conference"; // aktualisiert die Event-Details
scheduler.getEvent(id).start_date = new Date();   // ändert das Startdatum
scheduler.updateEvent(id);   // zeichnet das aktualisierte Event neu
~~~

### Related samples
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
- [Creating message boxes](https://docs.dhtmlx.com/scheduler/samples/09_api/02_dhtmlx_message.html)

### Related API
- [getEvent](api/method/getevent.md)

### Related Guides
- [Serverseitige Integration](guides/server-integration.md#technique)
