---
sidebar_label: "getEventText"
title: "getEventText method"
description: "ruft den mit einem Event verknüpften Text ab"
---

# getEventText
:::warning
Die Funktion ist veraltet
:::
### Description

@short: Ruft den mit einem Event verknüpften Text ab

@signature: getEventText: (id: string) =\> string

### Parameters

- `id` - (required) *string* - die Kennung des Events

### Returns
- ` start_date` - (string) - der Text des Events

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
...
scheduler.getEvent(eventId).text; // -> "Meeting"
~~~

### Related API
- [getEventEndDate](api/method/geteventenddate.md)
- [getEventStartDate](api/method/geteventstartdate.md)
