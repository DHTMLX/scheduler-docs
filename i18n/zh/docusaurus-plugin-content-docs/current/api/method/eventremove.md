---
sidebar_label: "eventRemove"
title: "eventRemove method"
description: "从HTML元素中移除事件处理程序"
---

# eventRemove

### Description

@short: 从HTML元素中移除事件处理程序

@signature: eventRemove: (id: string) =\> void

### Parameters

- `id` - (required) *string* - 事件处理程序的id

### Example

~~~jsx
const eventId = scheduler.event("divId", "click", function(e){
    do_something();
});

scheduler.eventRemove(eventId);
~~~

### Details

所有通过[event](api/method/event.md)添加的事件监听器在执行[destructor](api/method/destructor.md)时会自动移除。

### Related API
- [event](api/method/event.md)

### Change log
- 4.4版本新增
