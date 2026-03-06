---
sidebar_label: "onBeforeEventDragIn"
title: "onBeforeEventDragIn event"
description: "Wird unmittelbar ausgelöst, bevor ein gezogenes Event in den Scheduler-Bereich eintritt"
---

# onBeforeEventDragIn

### Description

@short: Wird unmittelbar ausgelöst, bevor ein gezogenes Event in den Scheduler-Bereich eintritt

@signature: onBeforeEventDragIn: (id: string, e: Event) =\> boolean

### Parameters

- `id` - (required) *string* - die ID des Events
- `e` - (required) *Event* - das native Event-Objekt

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDragIn", function (id, e){
    // hier eigene Logik einfügen
    return true;
});
~~~

### Details

:::note
 Dieses Event tritt nur während Drag-and-Drop-Operationen zwischen verschiedenen Schedulern auf. 
:::

### Related Guides
- [Drag-and-Drop-Operationen](guides/drag-between.md)
