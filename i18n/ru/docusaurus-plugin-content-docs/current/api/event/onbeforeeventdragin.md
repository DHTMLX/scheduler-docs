---
sidebar_label: "onBeforeEventDragIn"
title: "onBeforeEventDragIn event"
description: "срабатывает непосредственно перед тем, как перетаскиваемое событие входит в область scheduler"
---

# onBeforeEventDragIn

### Description

@short: Срабатывает непосредственно перед тем, как перетаскиваемое событие входит в область scheduler

@signature: onBeforeEventDragIn: (id: string, e: Event) =\> boolean

### Parameters

- `id` - (required) *string* - идентификатор события
- `e` - (required) *Event* - нативный объект события

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено стандартное действие события (<b>true</b>) или оно будет отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDragIn", function (id, e){
    // разместите здесь вашу пользовательскую логику
    return true;
});
~~~

### Details

:::note
 Это событие происходит только во время операций drag-and-drop между разными schedulers. 
:::

### Related Guides
- [Операции Drag-and-Drop](guides/drag-between.md)
