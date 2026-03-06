---
sidebar_label: "onEventDropOut"
title: "onEventDropOut event"
description: "срабатывает, когда перетаскиваемое событие отпущено за пределами области scheduler"
---

# onEventDropOut

### Description

@short: Срабатывает, когда перетаскиваемое событие отпущено за пределами области scheduler

@signature: onEventDragOut: (id: string, ev: object, to: object, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - идентификатор события
- `ev` - (required) *object* - объект события
- `to` - (required) *object* - целевой scheduler (null, если событие отпущено на пустом месте)
- `e` - (required) *Event* - родной объект события

### Returns
- ` result` - (boolean) - указывает, будет ли выполнено действие по умолчанию для события (<b>true</b>) или оно будет отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onEventDropOut", function (id, ev, to, e){
    // здесь можно добавить кастомную логику
    return true;
});
~~~

### Details

:::note
 Это событие срабатывает только во время операций drag-and-drop между разными schedulers. 
:::

### Related Guides
- [Операции Drag-and-Drop](guides/drag-between.md)
