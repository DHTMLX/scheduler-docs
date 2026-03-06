---
sidebar_label: "getEventEndDate"
title: "getEventEndDate method"
description: "Ruft das Enddatum eines Events ab"
---

# getEventEndDate
:::warning
Die Funktion ist veraltet
:::
### Description

@short: Ruft das Enddatum eines Events ab

@signature: getEventEndDate: (id: string) =\> Date

### Parameters

- `id` - (required) *string* - die ID des Events

### Returns
- ` end_date` - (Date) - das Enddatum des Events

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
