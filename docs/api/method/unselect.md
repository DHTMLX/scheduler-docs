---
sidebar_label: unselect
title: "unselect method"
description: "unselects the specified event"
---

# unselect

### Description

@short: Unselects the specified event

@signature: unselect: (id?: string) =\> void

### Parameters
- `id` - (optional) *string* - the event's id (if not specified, the currently selected event will be unselected)

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
