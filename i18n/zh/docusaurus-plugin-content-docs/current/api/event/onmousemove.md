---
sidebar_label: "onMouseMove"
title: "onMouseMove event"
description: "当鼠标光标在scheduler上移动时触发"
---

# onMouseMove

### Description

@short: 当鼠标光标在scheduler上移动时触发

@signature: onMouseMove: (id: string, e: Event) =\> void

### Parameters

- `id` - (required) *string* - 事件的id
- `e` - (required) *Event* - 一个原生事件对象

### Example

~~~jsx
scheduler.attachEvent("onMouseMove", function (id, e){
    //在这里编写自定义逻辑
});
~~~

### Related samples
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)
- 10_integration/02_dhtmlxTree_outer_drag.html

### Details

当光标移动到一个事件上时，处理函数会接收到该事件的id；如果没有移动到任何事件上，则接收到null。
