---
sidebar_label: "onBeforeEventDisplay"
title: "onBeforeEventDisplay event"
description: "在调用 'showEvent' 方法显示特定事件之前触发，允许您在事件出现之前运行代码。"
---

# onBeforeEventDisplay

### Description

@short: 在调用 'showEvent' 方法显示特定事件之前触发，允许您在事件出现之前运行代码。

@signature: onBeforeEventDisplay: (event: object, view: string) =\> boolean

### Parameters

- `event` - (required) *object* - 事件对象
- `view` - (required) *string* - 用于显示事件的视图名称

### Returns
- ` result` - (boolean) - 决定事件的默认操作是否继续执行（<b>true</b>）或被取消（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDisplay", function(event,view){
    //这里编写自定义逻辑
    return true;
});
~~~

### Related API
- [onAfterEventDisplay](api/event/onaftereventdisplay.md)
