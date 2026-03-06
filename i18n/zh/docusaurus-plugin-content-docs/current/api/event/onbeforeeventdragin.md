---
sidebar_label: "onBeforeEventDragIn"
title: "onBeforeEventDragIn event"
description: "在被拖动的事件进入 scheduler 区域之前触发"
---

# onBeforeEventDragIn

### Description

@short: 在被拖动的事件进入 scheduler 区域之前触发

@signature: onBeforeEventDragIn: (id: string, e: Event) =\> boolean

### Parameters

- `id` - (required) *string* - 事件的 id
- `e` - (required) *Event* - 原生事件对象

### Returns
- ` result` - (boolean) - 决定默认事件操作是否继续 (<b>true</b>) 或被取消 (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDragIn", function (id, e){
    // 在这里放置任何自定义逻辑
    return true;
});
~~~

### Details

:::note
 此事件仅在不同 scheduler 之间进行拖放操作时触发。 
:::

### Related Guides
- [드래그 앤 드롭(Drag-and-Drop) 작업](guides/drag-between.md)
