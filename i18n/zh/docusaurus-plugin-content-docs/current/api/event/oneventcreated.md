---
sidebar_label: "onEventCreated"
title: "onEventCreated event"
description: "当用户开始创建新事件时触发（通过双击或拖动）"
---

# onEventCreated

### Description

@short: 当用户开始创建新事件时触发（通过双击或拖动）

@signature: onEventCreated: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - 事件的唯一标识符
- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
scheduler.attachEvent("onEventCreated", function(id,e){
    // 可以在这里添加自定义逻辑
});
~~~
