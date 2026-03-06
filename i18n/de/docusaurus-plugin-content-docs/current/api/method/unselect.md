---
sidebar_label: "unselect"
title: "unselect method"
description: "entfernt die Auswahl vom angegebenen Event"
---

# unselect

### Description

@short: Entfernt die Auswahl vom angegebenen Event

@signature: unselect: (id?: string) =\> void

### Parameters

- `id` - (optional) *string* - die ID des Events (wenn keine ID angegeben wird, wird das aktuell ausgewählte Event deselektiert)

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:   "16-06-2013 12:00",
    text:   "Meeting"
});

scheduler.select(eventId);

scheduler.unselect();
~~~

### Related API
- [select](api/method/select.md)
