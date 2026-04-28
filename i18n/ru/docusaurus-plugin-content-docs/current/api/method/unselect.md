---
sidebar_label: снятие выделения
title: "метод unselect"
description: "снимает выделение с указанного события"
---

# unselect

### Description

@short: Удаляет выделение с указанного события

@signature: unselect: (id?: string) =\> void

### Parameters
- `id` - (optional) *string* - идентификатор события (если не указан, текущее выбранное событие будет снято)

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-06-2027 09:00",
    end_date:   "16-06-2027 12:00",
    text:   "Meeting"
});

scheduler.select(eventId);

scheduler.unselect();
~~~

### Related API
- [select](api/method/select.md)