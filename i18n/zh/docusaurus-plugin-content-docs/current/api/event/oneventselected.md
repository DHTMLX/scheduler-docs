---
sidebar_label: "onEventSelected"
title: "onEventSelected event"
description: "当用户在调度器中选择一个事件时触发"
---

# onEventSelected

### Description

@short: 当用户在调度器中选择一个事件时触发

@signature: onEventSelected: (id: string) =\> void;

### Parameters

- `id` - (required) *string* - 被选中事件的ID

### Example

~~~jsx
scheduler.attachEvent("onEventSelected", function(id){
    //这里编写任何自定义逻辑
});
~~~

### Related API
- [onEventUnselected](api/event/oneventunselected.md)
