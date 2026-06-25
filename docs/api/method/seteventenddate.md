---
sidebar_label: setEventEndDate
title: "setEventEndDate method"
description: "sets the event's end date"
---

# setEventEndDate
:::warning 
The method is deprecated. 
:::
### Description

@short: Sets the event's end date

@signature: setEventEndDate: (id: string, date: Date) =\> void

### Parameters

- `id` - (required) *string* - the event's id
- `date` - (required) *Date* - the new end date of the event

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: new Date(2027,1,10),
    end_date:   new Date(2027,1,13),
    text:   "Conference"
});
...
scheduler.getEvent(eventId).end_date = new Date(2027,1,15);    
scheduler.updateEvent(eventId);
~~~

### Related API
- [setEventStartDate](api/method/seteventstartdate.md)
