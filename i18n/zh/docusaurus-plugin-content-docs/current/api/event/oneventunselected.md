---
sidebar_label: "onEventUnselected"
title: "onEventUnselected event"
description: "当用户通过选择另一个事件取消选择某个事件时触发"
---

# onEventUnselected

### Description

@short: 当用户通过选择另一个事件取消选择某个事件时触发

@signature: onEventUnselected: (id: string) =\> void;

### Parameters

- `id` - (required) *string* - 被取消选择的事件的 id

### Example

~~~jsx
scheduler.attachEvent("onEventUnselected", function(id){
    //在这里编写自定义逻辑
});
~~~

### Related API
- [onEventSelected](api/event/oneventselected.md)
