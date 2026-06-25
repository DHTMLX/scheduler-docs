---
sidebar_label: getEvent
title: "getEvent method"
description: "returns the event object by its id"
---

# getEvent

### Description

@short: Returns the event object by its id

@signature: getEvent: (event_id: string | number) =\> any

### Parameters

- `event_id` - (required) *string | number* - the event's id

### Returns
- ` obj` - (object) - the event object

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-05-2027 09:00",
    end_date:   "16-05-2027 12:00",
    text:   "Meeting"
});
...    
const eventObj = scheduler.getEvent(eventId);
~~~

### Related samples
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
