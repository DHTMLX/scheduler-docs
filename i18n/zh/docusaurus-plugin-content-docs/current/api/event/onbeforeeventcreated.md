---
sidebar_label: "onBeforeEventCreated"
title: "onBeforeEventCreated event"
description: "当用户通过拖动光标在scheduler上创建新事件时触发"
---

# onBeforeEventCreated

### Description

@short: 当用户通过拖动光标在scheduler上创建新事件时触发

@signature: onBeforeEventCreated: (e: Event) =\> boolean

### Parameters

- `e` - (required) *Event* - 一个原生事件对象

### Returns
- ` result` - (boolean) - 指示事件的默认动作是否继续执行（<b>true</b>）或被取消（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventCreated", function (e){
    // 可以在这里添加自定义逻辑
    return true;
});
~~~

### Details

请注意，只有当 [drag_create](api/config/drag_create.md) 配置选项开启时，此事件才会触发。
