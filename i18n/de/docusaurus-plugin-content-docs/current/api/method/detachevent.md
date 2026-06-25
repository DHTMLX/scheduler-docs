---
sidebar_label: "detachEvent"
title: "detachEvent method"
description: "entfernt einen zuvor angehängten Event-Handler (einen, der mit der attachEvent-Methode hinzugefügt wurde)"
---

# detachEvent

### Description

@short: Entfernt einen zuvor angehängten Event-Handler (einen, der mit der attachEvent-Methode hinzugefügt wurde)

@signature: detachEvent: (id: string) =\> void

### Parameters

- `id` - (required) *string* - die Kennung des Event-Handlers

### Example

~~~jsx
const myEvent = scheduler.attachEvent("onClick", function (id){
    ...//Event-Handler-Code
});
...
scheduler.detachEvent(myEvent);
~~~

### Details

Alle Event-Listener, die über [event](api/method/event.md) hinzugefügt wurden, werden automatisch entfernt, wenn der [destructor](api/method/destructor.md) aufgerufen wird.

### Related API
- [attachEvent](api/method/attachevent.md)
