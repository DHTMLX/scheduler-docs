---
sidebar_label: "onDblClick"
title: "onDblClick event"
description: "当用户双击某个事件时触发"
---

# onDblClick

### Description

@short: 当用户双击某个事件时触发

@signature: onDblClick: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - 事件的id
- `e` - (required) *Event* - 原生事件对象

### Returns
- ` result` - (boolean) - 指示事件的默认操作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onDblClick", function (id, e){
    // 在这里编写自定义逻辑
    return true;
})
~~~

### Details

此事件可以被阻止。返回*false*将阻止默认行为的发生。
