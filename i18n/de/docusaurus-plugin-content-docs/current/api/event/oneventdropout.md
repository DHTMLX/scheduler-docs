---
sidebar_label: "onEventDropOut"
title: "onEventDropOut event"
description: "Wird ausgelöst, wenn ein gezogenes Event außerhalb des Scheduler-Bereichs abgelegt wird"
---

# onEventDropOut

### Description

@short: Wird ausgelöst, wenn ein gezogenes Event außerhalb des Scheduler-Bereichs abgelegt wird

@signature: onEventDragOut: (id: string, ev: object, to: object, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - die ID des Events
- `ev` - (required) *object* - das Event-Objekt
- `to` - (required) *object* - der Ziel-Scheduler (null, wenn auf einem leeren Bereich abgelegt)
- `e` - (required) *Event* - das native Event-Objekt

### Returns
- ` result` - (boolean) - gibt an, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder verhindert wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onEventDropOut", function (id, ev, to, e){
    // hier kann benutzerdefinierte Logik hinzugefügt werden
    return true;
});
~~~

### Details

:::note
 Dieses Event wird nur während Drag-and-Drop-Operationen zwischen verschiedenen Schedulern ausgelöst. 
:::

### Related Guides
- [Drag-and-Drop-Operationen](guides/drag-between.md)
