---
sidebar_label: onEventDragIn
title: "onEventDragIn event"
description: "срабатывает, когда перетащенное событие перемещается во планировщик"
---

# onEventDragIn

### Description

@short: Срабатывает, когда перетащенное событие перемещается во планировщик

@signature: onEventDragIn: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - идентификатор события
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
scheduler.attachEvent("onEventDragIn", function (id, e){
    // здесь можно поместить произвольную логику
});
~~~

### Details

:::note
 Событие срабатывает только в случае перетаскивания между планировщиками.
:::

### Related Guides
- [Перетаскивание и отпускание](guides/drag-between.md)