---
sidebar_label: onBeforeEventDragOut
title: "onBeforeEventDragOut событие"
description: "срабатывает до того, как перетащенное событие будет перемещено за пределы планировщика"
---

# onBeforeEventDragOut

### Description

@short: Срабатывает до того, как перетащенное событие будет перемещено за пределы планировщика

@signature: onBeforeEventDragOut: (id: string, ev: object, e: Event) =\> boolean

### Parameters

- `id` - (required) *string* - идентификатор события
- `ev` - (required) *object* - объект данных события
- `e` - (required) *Event* - нативный объект события

### Returns
- `result` - (boolean) - определяет, будет ли выполнение действия по умолчанию события выполнено (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDragOut", function (id, ev, e){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

:::note
 Событие срабатывает только в случае drag-n-drop между планировщиками. 
 :::

### Related Guides
- [Операции drag-and-drop](guides/drag-between.md)