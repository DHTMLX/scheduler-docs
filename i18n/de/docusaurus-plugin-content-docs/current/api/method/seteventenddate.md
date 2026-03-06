---
sidebar_label: "setEventEndDate"
title: "setEventEndDate method"
description: "aktualisiert das Enddatum eines Events"
---

# setEventEndDate
:::warning
Die Funktion ist veraltet
:::
### Description

@short: Aktualisiert das Enddatum eines Events

@signature: setEventEndDate: (id: string, date: Date) =\> void

### Parameters

- `id` - (required) *string* - die eindeutige Kennung des Events
- `date` - (required) *Date* - das aktualisierte Enddatum für das Event

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: new Date(2013,1,10),
    end_date:   new Date(2013,1,13),
    text:   "Conference"
});
...
scheduler.getEvent(eventId).end_date = new Date(2013,1,15);    
scheduler.updateEvent(eventId);
~~~

### Related API
- [setEventStartDate](api/method/seteventstartdate.md)
