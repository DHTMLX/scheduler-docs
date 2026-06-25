---
sidebar_label: "onDragEnd"
title: "onDragEnd event"
description: "当拖拽或调整大小操作完成时触发"
---

# onDragEnd

### Description

@short: 当拖拽或调整大小操作完成时触发

@signature: onDragEnd: (id: string, mode: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - 事件的标识符
- `mode` - (required) *string* - 拖拽操作的类型:"move"（移动）、"resize"（调整大小）或 "create"（创建）
- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
let dragged_event;
scheduler.attachEvent("onBeforeDrag", function (id, mode, e){
    // 这有助于捕获正在被拖拽的事件
    dragged_event = scheduler.getEvent(id); 
    return true;
});

scheduler.attachEvent("onDragEnd", function(id, mode, e){
    let event_obj = dragged_event;
    // 在这里放置您的自定义逻辑
});
~~~

### Related API
- [onBeforeDrag](api/event/onbeforedrag.md)
