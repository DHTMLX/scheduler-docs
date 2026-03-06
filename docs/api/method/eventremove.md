---
sidebar_label: eventRemove
title: "eventRemove method"
description: "removes an event handler from an HTML element"
---

# eventRemove

### Description

@short: Removes an event handler from an HTML element

@signature: eventRemove: (id: string) =\> void

### Parameters

- `id` - (required) *string* - the id of an event handler

### Example

~~~jsx
var eventId = scheduler.event("divId", "click", function(e){
    do_something();
});

scheduler.eventRemove(eventId);
~~~

### Details

All event listeners attached using [event](api/method/event.md) will be detached automatically when the [destructor](api/method/destructor.md) is called.

### Related API
- [event](api/method/event.md)

### Change log
- added in version 4.4
