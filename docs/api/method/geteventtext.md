---
sidebar_label: getEventText
title: "getEventText method"
description: "gets the event's text"
---

# getEventText
:::warning 
The method is deprecated. 
:::
### Description

@short: Gets the event's text

@signature: getEventText: (id: string) =\> string

### Parameters

- `id` - (required) *string* - the event's id

### Returns
- ` start_date` - (string) - the event's text

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-05-2027 09:00",
    end_date:   "16-05-2027 12:00",
    text:   "Meeting"
});
...
scheduler.getEvent(eventId).text; // -> "Meeting"
~~~

### Related API
- [getEventEndDate](api/method/geteventenddate.md)
- [getEventStartDate](api/method/geteventstartdate.md)
