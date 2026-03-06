---
sidebar_label: "onEventDragOut"
title: "onEventDragOut event"
description: "当拖拽的事件离开scheduler区域时触发"
---

# onEventDragOut

### Description

@short: 当拖拽的事件离开scheduler区域时触发

@signature: onEventDragOut: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - 事件的id
- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
scheduler.attachEvent("onEventDragOut", function (id, e){
    //在这里添加自定义逻辑
});
~~~

### Details

:::note
 此事件仅在不同scheduler之间进行拖放操作时触发。 
:::

### Related Guides
- [드래그 앤 드롭(Drag-and-Drop) 작업](guides/drag-between.md)
