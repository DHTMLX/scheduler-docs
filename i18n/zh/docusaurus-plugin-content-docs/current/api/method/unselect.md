---
sidebar_label: "unselect"
title: "unselect method"
description: "从指定事件中移除选中状态"
---

# unselect

### Description

@short: 从指定事件中移除选中状态

@signature: unselect: (id?: string) =\> void

### Parameters

- `id` - (optional) *string* - 事件的ID（如果未提供ID，则取消当前选中的事件）

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
