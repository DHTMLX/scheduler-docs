---
sidebar_label: "onAfterEventDisplay"
title: "onAfterEventDisplay event"
description: "当scheduler切换视图、日期、时间等以显示通过'showEvent'方法指定的事件时触发，该事件在事件显示之后发生。"
---

# onAfterEventDisplay

### Description

@short: 当scheduler切换视图、日期、时间等以显示通过'showEvent'方法指定的事件时触发，该事件在事件显示之后发生。

@signature: onAfterEventDisplay: (event: object, string: view) =\> void

### Parameters

- `event` - (required) *object* - 事件对象
- `view` - (required) *string* - 用于显示事件的视图名称

### Example

~~~jsx
scheduler.attachEvent("onAfterEventDisplay", function(event,view){
    //在这里编写自定义逻辑
});
~~~

### Related API
- [onBeforeEventDisplay](api/event/onbeforeeventdisplay.md)
