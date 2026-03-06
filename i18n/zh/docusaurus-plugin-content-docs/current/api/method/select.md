---
sidebar_label: "select"
title: "select method"
description: "选择你指定的事件"
---

# select

### Description

@short: 选择你指定的事件

@signature: select: (id: string) =\> void;

### Parameters

- `id` - (required) *string* - 事件的id

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
