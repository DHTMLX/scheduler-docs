---
sidebar_label: выбор
title: "метод select"
description: "выбирает указанное событие"
---

# select

### Description

@short: Выбирает указанное событие

@signature: select: (id: string) =\> void;

### Parameters

- `id` - (required) *string* - идентификатор события

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-06-2027 09:00",
    end_date:   "16-06-2027 12:00",
    text:   "Meeting"
});

scheduler.select(eventId);
~~~

### Related API
- [unselect](api/method/unselect.md)