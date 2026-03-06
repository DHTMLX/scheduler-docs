---
sidebar_label: getEventEndDate
title: "getEventEndDate method"
description: "gets the event's end date"
---

# getEventEndDate
:::warning 
The method is deprecated. 
:::
### Description

@short: Gets the event's end date

@signature: getEventEndDate: (id: string) =\> Date

### Parameters

- `id` - (required) *string* - the event's id

### Returns
- ` end_date` - (Date) - the event's end date

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
...
scheduler.getEvent(eventId).end_date; // -> Thu May 16 2013 12:00:00
~~~

### Related API
- [getEventStartDate](api/method/geteventstartdate.md)
- [getEventText](api/method/geteventtext.md)
