---
sidebar_label: "getEventStartDate"
title: "getEventStartDate method"
description: "Ruft das Startdatum eines Events ab"
---

# getEventStartDate
:::warning
Die Funktion ist veraltet
:::
### Description

@short: Ruft das Startdatum eines Events ab

@signature: getEventStartDate: (id: string) =\> Date

### Parameters

- `id` - (required) *string* - Die eindeutige Kennung des Events

### Returns
- ` start_date` - (Date) - Das Startdatum und die Startzeit des Events

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
...
scheduler.getEvent(eventId).start_date; // -> Thu May 16 2013 09:00:00
~~~

### Related API
- [getEventEndDate](api/method/geteventenddate.md)
- [getEventText](api/method/geteventtext.md)
