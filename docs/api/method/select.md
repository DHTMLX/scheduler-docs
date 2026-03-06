---
sidebar_label: select
title: "select method"
description: "selects the specified event"
---

# select

### Description

@short: Selects the specified event

@signature: select: (id: string) => void;

### Parameters

- `id` - (required) *string* - the event's id

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
