---
sidebar_label: "setEventText"
title: "setEventText method"
description: "aktualisiert den Text eines bestimmten Events"
---

# setEventText
:::warning
Die Funktion ist veraltet
:::
### Description

@short: Aktualisiert den Text eines bestimmten Events

@signature: setEventText: (id: string, text: string) =\> void

### Parameters

- `id` - (required) *string* - die eindeutige Kennung des Events  
- `text` - (required) *string* - der aktualisierte Textinhalt für das Event

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: new Date(2013,1,10),
    end_date:   new Date(2013,1,13),
    text:   "Conference"
});
...
scheduler.getEvent(eventId).text = "Meeting";
scheduler.updateEvent(eventId);
~~~

### Related API
- [getEventText](api/method/geteventtext.md)
