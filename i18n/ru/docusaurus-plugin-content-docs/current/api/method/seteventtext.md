---
sidebar_label: "setEventText"
title: "setEventText method"
description: "обновляет текст конкретного события"
---

# setEventText
:::warning
Эта функицональность устарела
::: 
### Description

@short: Обновляет текст конкретного события

@signature: setEventText: (id: string, text: string) =\> void

### Parameters

- `id` - (required) *string* - уникальный идентификатор события
- `text` - (required) *string* - обновлённое текстовое содержимое события

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
