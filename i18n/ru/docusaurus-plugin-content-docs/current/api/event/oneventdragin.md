---
sidebar_label: "onEventDragIn"
title: "onEventDragIn event"
description: "срабатывает, когда перетаскиваемое событие входит в scheduler"
---

# onEventDragIn

### Description

@short: Срабатывает, когда перетаскиваемое событие входит в scheduler

@signature: onEventDragIn: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - идентификатор события
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
scheduler.attachEvent("onEventDragIn", function (id, e){
    //любая ваша логика здесь
});
~~~

### Details

:::note
 Это событие возникает только во время drag-and-drop действий между разными schedulers. 
:::

### Related Guides
- [Операции Drag-and-Drop](guides/drag-between.md)
