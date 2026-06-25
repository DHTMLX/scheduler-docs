---
sidebar_label: onBeforeEventDragIn
title: "onBeforeEventDragIn event"
description: "вызывает перед тем, как перетаскиваемое событие будет перемещено над планировщиком"
---

# onBeforeEventDragIn

### Description

@short: Срабатывает перед тем, как перетаскиваемое событие будет перемещено над планировщиком

@signature: onBeforeEventDragIn: (id: string, e: Event) =\> boolean

### Parameters

- `id` - (обязательно) *string* - идентификатор события
- `e` - (обязательно) *Event* - нативный объект события

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDragIn", function (id, e){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

:::note
 Событие срабатывает только в случае перетаскивания между планировщиками. 
:::

### Related Guides
- [Операции перетаскивания](guides/drag-between.md)