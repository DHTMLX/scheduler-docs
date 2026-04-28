---
sidebar_label: onEventDragOut
title: "onEventDragOut event"
description: "срабатывает, когда перетаскиваемое событие перемещается за пределы планировщика"
---

# onEventDragOut

### Description

@short: Срабатывает, когда перетаскиваемое событие перемещается за пределы планировщика

@signature: onEventDragOut: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - идентификатор события
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
scheduler.attachEvent("onEventDragOut", function (id, e){
    // любая ваша логика здесь
});
~~~

### Details

:::note
 Событие срабатывает только в случае перетаскивания между планировщиками. 
:::

### Related Guides
- [Операции перетаскивания](guides/drag-between.md)