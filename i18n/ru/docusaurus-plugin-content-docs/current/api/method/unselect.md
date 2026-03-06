---
sidebar_label: "unselect"
title: "unselect method"
description: "удаляет выделение с указанного события"
---

# unselect

### Description

@short: Удаляет выделение с указанного события

@signature: unselect: (id?: string) =\> void

### Parameters

- `id` - (optional) *string* - идентификатор события (если id не указан, будет снято выделение с текущего выбранного события)

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
