---
sidebar_label: setEventStartDate
title: "setEventStartDate method"
description: "sets the event's start date"
---

# setEventStartDate
:::warning 
The method is deprecated. 
:::
### Description

@short: Sets the event's start date

@signature: setEventStartDate: (id: string, date: Date) =\> void

### Parameters

- `id` - (required) *string* - the event's id
- `date` - (required) *Date* - the new start date of the event

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: new Date(2027,1,10),
    end_date:   new Date(2027,1,13),
    text:   "Conference"
});
...
scheduler.getEvent(eventId).start_date = new Date(2027,1,09);
scheduler.updateEvent(eventId);
~~~

### Related API
- [setEventEndDate](api/method/seteventenddate.md)
