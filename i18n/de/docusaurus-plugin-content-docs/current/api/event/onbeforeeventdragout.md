---
sidebar_label: "onBeforeEventDragOut"
title: "onBeforeEventDragOut event"
description: "wird unmittelbar ausgelöst, bevor ein Event aus dem Scheduler herausgezogen wird"
---

# onBeforeEventDragOut

### Description

@short: Wird unmittelbar ausgelöst, bevor ein Event aus dem Scheduler herausgezogen wird

@signature: onBeforeEventDragOut: (id: string, ev: object, e: Event) =\> boolean

### Parameters

- `id` - (required) *string* - die ID des Events
- `ev` - (required) *object* - das Datenobjekt des Events
- `e` - (required) *Event* - ein natives Event-Objekt

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events fortgesetzt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDragOut", function (id, ev, e){
    //beliebige benutzerdefinierte Logik hier
    return true;
});
~~~

### Details

:::note
 Dieses Event tritt nur auf, wenn zwischen verschiedenen Schedulern per Drag & Drop verschoben wird. 
:::

### Related Guides
- [Drag-and-Drop-Operationen](guides/drag-between.md)
