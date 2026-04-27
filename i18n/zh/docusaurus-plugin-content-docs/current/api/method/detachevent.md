---
sidebar_label: "detachEvent"
title: "detachEvent method"
description: "移除之前通过 attachEvent 方法添加的事件处理程序"
---

# detachEvent

### Description

@short: 移除之前通过 attachEvent 方法添加的事件处理程序

@signature: detachEvent: (id: string) =\> void

### Parameters

- `id` - (required) *string* - 事件处理程序的标识符

### Example

~~~jsx
const myEvent = scheduler.attachEvent("onClick", function (id){
    ...//事件处理代码
});
...
scheduler.detachEvent(myEvent);
~~~

### Details

通过 [event](api/method/event.md) 添加的任何事件监听器在调用 [destructor](api/method/destructor.md) 时会被自动移除。

### Related API
- [attachEvent](api/method/attachevent.md)
