---
sidebar_label: "onEventDragIn"
title: "onEventDragIn event"
description: "Wird ausgelöst, wenn ein gezogenes Event in den Scheduler eintritt"
---

# onEventDragIn

### Description

@short: Wird ausgelöst, wenn ein gezogenes Event in den Scheduler eintritt

@signature: onEventDragIn: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - die ID des Events
- `e` - (required) *Event* - ein nativer Event-Objekt

### Example

~~~jsx
scheduler.attachEvent("onEventDragIn", function (id, e){
    //beliebige benutzerdefinierte Logik hier
});
~~~

### Details

:::note
 Dieses Event tritt nur bei Drag-and-Drop-Aktionen zwischen verschiedenen Schedulern auf. 
:::

### Related Guides
- [Drag-and-Drop-Operationen](guides/drag-between.md)
