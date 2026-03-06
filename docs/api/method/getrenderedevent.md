---
sidebar_label: getRenderedEvent
title: "getRenderedEvent method"
description: "gets the object of the currently displayed event"
---

# getRenderedEvent

### Description

@short: Gets the object of the currently displayed event

@signature: getRenderedEvent: (id: string) =\> HTMLElement

### Parameters

- `id` - (required) *string* - the event's id

### Returns
- `event` - (HTMLElement) - **the event's HTML object** - if the event is currently displayed in the scheduler. <br> **'null'** - if the event isn't displayed in the scheduler at the moment of calling the method.

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
var eventObj = scheduler.getRenderedEvent(eventId);
//-> <div event_id="123649234723" ...>09:00 Meeting</div>
~~~

### Details

:::note

Available from version 3.5
 
:::
