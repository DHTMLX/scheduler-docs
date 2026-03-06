---
sidebar_label: "setEventStartDate"
title: "setEventStartDate method"
description: "aktualisiert das Startdatum des Events"
---

# setEventStartDate
:::warning
Die Funktion ist veraltet
:::
### Description

@short: Aktualisiert das Startdatum des Events

@signature: setEventStartDate: (id: string, date: Date) =\> void

### Parameters

- `id` - (required) *string* - die ID des Events
- `date` - (required) *Date* - das neue Startdatum für das Event

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: new Date(2013,1,10),
    end_date:   new Date(2013,1,13),
    text:   "Conference"
});
...
scheduler.getEvent(eventId).start_date = new Date(2013,1,09);
scheduler.updateEvent(eventId);
~~~

### Related API
- [setEventEndDate](api/method/seteventenddate.md)
