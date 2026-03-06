---
sidebar_label: "onBeforeEventDragOut"
title: "onBeforeEventDragOut event"
description: "срабатывает непосредственно перед тем, как событие будет перетащено за пределы scheduler-а"
---

# onBeforeEventDragOut

### Description

@short: Срабатывает непосредственно перед тем, как событие будет перетащено за пределы scheduler-а

@signature: onBeforeEventDragOut: (id: string, ev: object, e: Event) =\> boolean

### Parameters

- `id` - (required) *string* - id события
- `ev` - (required) *object* - объект с данными события
- `e` - (required) *Event* - нативный объект события

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено стандартное действие события (<b>true</b>) или остановлено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDragOut", function (id, ev, e){
    //любая пользовательская логика здесь
    return true;
});
~~~

### Details

:::note
 Это событие происходит только при drag and drop между разными scheduler-ами. 
:::

### Related Guides
- [Операции Drag-and-Drop](guides/drag-between.md)
