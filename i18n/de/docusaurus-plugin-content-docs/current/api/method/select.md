---
sidebar_label: "select"
title: "select method"
description: "wählt das von Ihnen angegebene Event aus"
---

# select

### Description

@short: Wählt das von Ihnen angegebene Event aus

@signature: select: (id: string) =\> void;

### Parameters

- `id` - (required) *string* - die ID des Events

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
