---
sidebar_label: "onEventDropOut"
title: "onEventDropOut event"
description: "当拖拽的事件被放置到调度器区域外时触发"
---

# onEventDropOut

### Description

@short: 当拖拽的事件被放置到调度器区域外时触发

@signature: onEventDragOut: (id: string, ev: object, to: object, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - 事件的ID
- `ev` - (required) *object* - 事件对象
- `to` - (required) *object* - 目标调度器（如果放置在空白区域则为null）
- `e` - (required) *Event* - 原生事件对象

### Returns
- ` result` - (boolean) - 指示默认事件操作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onEventDropOut", function (id, ev, to, e){
    // 可以在这里添加自定义逻辑
    return true;
});
~~~

### Details

:::note
 该事件仅在调度器之间进行拖放操作时触发。 
:::

### Related Guides
- [드래그 앤 드롭(Drag-and-Drop) 작업](guides/drag-between.md)
