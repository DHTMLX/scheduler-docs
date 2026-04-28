---
sidebar_label: onEventDrag
title: "onEventDrag 事件"
description: "在调度器中拖拽/调整事件时触发"
---

# onEventDrag

### Description

@short: 当用户在调度器中拖拽/调整事件时触发

@signature: onEventDrag: (id: string, mode: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - 事件的 id
- `mode` - (required) *string* - 拖拽模式: "move","resize" 或 "new-size"（创建新事件）
- `e` - (required) *Event* - 本机原生事件对象

### Example

~~~jsx
scheduler.attachEvent("onEventDrag", (id, mode, e) => {
    // 在此处编写任意自定义逻辑
});
~~~

### Related samples
- [只读 Lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)
- [只读事件](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Details

模式描述：

- `move` - 用户在 Scheduler 上拖动事件
- `resize` - 用户通过拖拽调整事件大小
- `new-size` - 用户通过拖拽创建一个新事件