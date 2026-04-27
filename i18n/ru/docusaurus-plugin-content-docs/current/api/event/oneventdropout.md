---
sidebar_label: onEventDropOut
title: "onEventDropOut событие"
description: "срабатывает, когда перетаскиваемое событие сбрасывается на область за пределами расписателя"
---

# onEventDropOut

### Description

@short: Срабатывает, когда перетаскиваемое событие сбрасывается на область за пределами расписателя

@signature: onEventDragOut: (id: string, ev: object, to: object, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - идентификатор события
- `ev` - (required) *object* - объект события
- `to` - (required) *object* - целевой scheduler (null, если сброшено в пустую область)
- `e` - (required) *Event* - нативный объект события

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию у события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onEventDropOut", function (id, ev, to, e){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

:::note
 Событие срабатывает только в случае перетаскивания между расписателями. 
:::

### Related Guides
- [Операции drag-and-drop](guides/drag-between.md)