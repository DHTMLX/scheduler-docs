---
sidebar_label: "eventRemove"
title: "eventRemove method"
description: "entfernt einen Event-Handler von einem HTML-Element"
---

# eventRemove

### Description

@short: Entfernt einen Event-Handler von einem HTML-Element

@signature: eventRemove: (id: string) =\> void

### Parameters

- `id` - (required) *string* - die ID eines Event-Handlers

### Example

~~~jsx
var eventId = scheduler.event("divId", "click", function(e){
    do_something();
});

scheduler.eventRemove(eventId);
~~~

### Details

Alle Event-Listener, die mit [event](api/method/event.md) hinzugefügt wurden, werden automatisch entfernt, wenn der [destructor](api/method/destructor.md) ausgeführt wird.

### Related API
- [title:  method](api/method/event.md)

### Change log
- hinzugefügt in Version 4.4
