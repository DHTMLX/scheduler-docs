---
sidebar_label: "getEvent"
title: "getEvent method"
description: "предоставляет объект события, соответствующий заданному id"
---

# getEvent

### Description

@short: Предоставляет объект события, соответствующий заданному id

@signature: getEvent: (event_id: string | number) =\> any

### Parameters

- `event_id` - (required) *string | number* - id события

### Returns
- ` obj` - (object) - объект события

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
