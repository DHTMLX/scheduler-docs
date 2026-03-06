---
sidebar_label: "onEventDragOut"
title: "onEventDragOut event"
description: "Wird ausgelöst, wenn ein gezogenes Event den Scheduler-Bereich verlässt"
---

# onEventDragOut

### Description

@short: Wird ausgelöst, wenn ein gezogenes Event den Scheduler-Bereich verlässt

@signature: onEventDragOut: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - die ID des Events
- `e` - (required) *Event* - ein nativer Event-Objekt

### Example

~~~jsx
scheduler.attachEvent("onEventDragOut", function (id, e){
    //beliebige benutzerdefinierte Logik hier
});
~~~

### Details

:::note
 Dieses Event tritt nur bei Drag-and-Drop-Aktionen zwischen verschiedenen Schedulern auf. 
:::

### Related Guides
- [Drag-and-Drop-Operationen](guides/drag-between.md)
