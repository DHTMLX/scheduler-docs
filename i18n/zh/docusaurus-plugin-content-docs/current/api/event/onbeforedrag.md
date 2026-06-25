---
sidebar_label: onBeforeDrag
title: "onBeforeDrag 事件"
description: "当用户开始拖拽/调整大小操作时触发（版本 2.1+）"
---

# onBeforeDrag

### Description

@short: 当用户开始拖拽/调整大小操作时触发（版本 2.1+）

@signature: onBeforeDrag: (id: string, mode: string, e: Event) => boolean

### Parameters

- `id` - (必填) *string* - 事件的 ID
- `mode` - (必填) *string* - 拖拽模式： "move","resize" 或 "create"
- `e` - (必填) *Event* - 一个原生事件对象

### Returns
- `result` - (布尔) - 指定事件的默认操作是否会被触发 (`true`) 还是取消 (`false`)

### Example

~~~jsx
scheduler.attachEvent("onBeforeDrag", (id, mode, e) => {
    // 在此处编写任意自定义逻辑
    return true;
});
~~~

### Related samples
- [只读 lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)
- [只读事件](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Details

当用户在 scheduler 内点击支持拖动的元素时，会触发此事件。

对于 "create" 模式，`id` 参数尚未设置，因为新事件尚未创建。
