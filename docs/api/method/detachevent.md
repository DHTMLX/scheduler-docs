---
sidebar_label: detachEvent
title: "detachEvent method"
description: "detaches a handler from an event (which was attached before by the attachEvent method)"
---

# detachEvent

### Description

@short: Detaches a handler from an event (which was attached before by the attachEvent method)

@signature: detachEvent: (id: string) =\> void

### Parameters

- `id` - (required) *string* - the event's id

### Example

~~~jsx
var myEvent = scheduler.attachEvent("onClick", function (id){
    ...//event handler code
});
...
scheduler.detachEvent(myEvent);
~~~

### Details

All event listeners attached using [event](api/method/event.md) will be detached automatically when the [destructor](api/method/destructor.md) is called.

### Related API
- [attachEvent](api/method/attachevent.md)
