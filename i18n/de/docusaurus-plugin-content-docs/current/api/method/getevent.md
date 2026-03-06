---
sidebar_label: "getEvent"
title: "getEvent method"
description: "bietet das Event-Objekt, das einer gegebenen ID entspricht"
---

# getEvent

### Description

@short: Bietet das Event-Objekt, das einer gegebenen ID entspricht

@signature: getEvent: (event_id: string | number) =\> any

### Parameters

- `event_id` - (required) *string | number* - die ID des Events

### Returns
- ` obj` - (object) - das Event-Objekt

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
...    
var eventObj = scheduler.getEvent(eventId);
~~~

### Related samples
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
