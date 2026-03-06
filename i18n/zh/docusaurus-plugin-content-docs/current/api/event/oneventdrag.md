---
sidebar_label: "onEventDrag"
title: "onEventDrag event"
description: "当事件在调度器中被拖动或调整大小时触发"
---

# onEventDrag

### Description

@short: 当事件在调度器中被拖动或调整大小时触发

@signature: onEventDrag: (id: string, mode: string, ev: Event) =\> void;

### Parameters

- `id` - (required) *string* - 事件的 id
- `mode` - (required) *string* - 拖动模式:"move"（移动）、"resize"（调整大小）或 "new-size"（创建新事件时）
- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
scheduler.attachEvent("onEventDrag", function (id, mode, e){
    // 可以在这里添加自定义逻辑
});
~~~

### Related samples
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)
- [Read-only events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Details

模式说明:

- **move** - 事件正在调度器中被拖动。
- **resize** - 事件正在通过拖放操作调整大小。
- **new-size** - 通过拖放操作创建一个新事件。
