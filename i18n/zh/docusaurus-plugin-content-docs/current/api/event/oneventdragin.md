---
sidebar_label: "onEventDragIn"
title: "onEventDragIn event"
description: "当拖动的事件进入调度器时触发"
---

# onEventDragIn

### Description

@short: 当拖动的事件进入调度器时触发

@signature: onEventDragIn: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - 事件的 id
- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
scheduler.attachEvent("onEventDragIn", function (id, e){
    //这里编写自定义逻辑
});
~~~

### Details

:::note
 此事件仅在不同调度器之间进行拖放操作时触发。 
:::

### Related Guides
- [드래그 앤 드롭(Drag-and-Drop) 작업](guides/drag-between.md)
