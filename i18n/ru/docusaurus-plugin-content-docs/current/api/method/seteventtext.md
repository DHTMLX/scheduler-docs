---
sidebar_label: setEventText
title: "setEventText method"
description: "устанавливает текст события"
---

# setEventText
:::warning 
Метод устарел.
:::
### Description

@short: Устанавливает текст события

@signature: setEventText: (id: string, text: string) =\> void

### Parameters

- `id` - (required) *string* - идентификатор события
- `text` - (required) *string* - новый текст события

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: new Date(2027,1,10),
    end_date:   new Date(2027,1,13),
    text:   "Conference"
});
...
scheduler.getEvent(eventId).text = "Meeting";
scheduler.updateEvent(eventId);
~~~

### Related API
- [getEventText](api/method/geteventtext.md)