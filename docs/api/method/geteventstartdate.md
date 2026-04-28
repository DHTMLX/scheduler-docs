---
sidebar_label: getEventStartDate
title: "getEventStartDate method"
description: "gets the event's start date"
---

# getEventStartDate
:::warning 
The method is deprecated. 
:::
### Description

@short: Gets the event's start date

@signature: getEventStartDate: (id: string) =\> Date

### Parameters

- `id` - (required) *string* - the event's id

### Returns
- ` start_date` - (Date) - the event's start date

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-05-2027 09:00",
    end_date:   "16-05-2027 12:00",
    text:   "Meeting"
});
...
scheduler.getEvent(eventId).start_date; // -> Thu May 16 2027 09:00:00
~~~

### Related API
- [getEventEndDate](api/method/geteventenddate.md)
- [getEventText](api/method/geteventtext.md)
