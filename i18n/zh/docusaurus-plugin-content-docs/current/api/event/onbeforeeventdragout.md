---
sidebar_label: "onBeforeEventDragOut"
title: "onBeforeEventDragOut event"
description: "在事件被拖出调度器之前触发"
---

# onBeforeEventDragOut

### Description

@short: 在事件被拖出调度器之前触发

@signature: onBeforeEventDragOut: (id: string, ev: object, e: Event) =\> boolean

### Parameters

- `id` - (required) *string* - 事件的ID
- `ev` - (required) *object* - 事件的数据对象
- `e` - (required) *Event* - 原生事件对象

### Returns
- ` result` - (boolean) - 决定默认事件操作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDragOut", function (id, ev, e){
    // 在这里编写自定义逻辑
    return true;
});
~~~

### Details

:::note
 此事件仅在不同调度器之间拖放时触发。 
:::

### Related Guides
- [드래그 앤 드롭(Drag-and-Drop) 작업](guides/drag-between.md)
