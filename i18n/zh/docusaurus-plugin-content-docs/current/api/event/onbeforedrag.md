---
sidebar_label: "onBeforeDrag"
title: "onBeforeDrag event"
description: "当用户开始拖动或调整大小操作时触发（自版本 2.1+ 起可用）"
---

# onBeforeDrag

### Description

@short: 当用户开始拖动或调整大小操作时触发（自版本 2.1+ 起可用）

@signature: onBeforeDrag: (id: string, mode: string, e: Event) =\> boolean

### Parameters

- `id` - (required) *string* - 事件的标识符
- `mode` - (required) *string* - 拖动操作的类型:"move"（移动）、"resize"（调整大小）或 "create"（创建）
- `e` - (required) *Event* - 原生事件对象

### Returns
- ` result` - (boolean) - 决定是否允许事件的默认操作继续执行（<b>true</b>）或阻止（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onBeforeDrag", function (id, mode, e){
    // 可以在这里添加自定义逻辑
    return true;
});
~~~

### Related samples
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)
- [Read-only events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Details

当用户在 scheduler 内点击支持拖动的元素时，会触发此事件。

对于 "create" 模式，id 参数尚未设置，因为新事件尚未创建。
