---
sidebar_label: setEventText
title: "setEventText method"
description: "sets the event's text"
---

# setEventText
:::warning 
The method is deprecated. 
:::
### Description

@short: Sets the event's text

@signature: setEventText: (id: string, text: string) =\> void

### Parameters

- `id` - (required) *string* - the event's id
- `text` - (required) *string* - the new text of the event

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: new Date(2013,1,10),
    end_date:   new Date(2013,1,13),
    text:   "Conference"
});
...
scheduler.getEvent(eventId).text = "Meeting";
scheduler.updateEvent(eventId);
~~~

### Related API
- [getEventText](api/method/geteventtext.md)
