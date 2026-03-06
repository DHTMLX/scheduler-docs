---
sidebar_label: "select"
title: "select method"
description: "выбирает указанный вами event"
---

# select

### Description

@short: Выбирает указанный вами event

@signature: select: (id: string) =\> void;

### Parameters

- `id` - (required) *string* - id события

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:   "16-06-2013 12:00",
    text:   "Meeting"
});

scheduler.select(eventId);
~~~

### Related API
- [unselect](api/method/unselect.md)
