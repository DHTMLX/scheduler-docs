---
sidebar_label: "onEventDragOut"
title: "onEventDragOut event"
description: "срабатывает, когда перетаскиваемое событие покидает область планировщика"
---

# onEventDragOut

### Description

@short: Срабатывает, когда перетаскиваемое событие покидает область планировщика

@signature: onEventDragOut: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - id события
- `e` - (required) *Event* - объект нативного события

### Example

~~~jsx
scheduler.attachEvent("onEventDragOut", function (id, e){
    //любая ваша логика здесь
});
~~~

### Details

:::note
 Это событие происходит только во время операций drag-and-drop между разными планировщиками. 
:::

### Related Guides
- [Операции Drag-and-Drop](guides/drag-between.md)
