---
sidebar_label: onEventUnselected
title: "onEventUnselected event"
description: "fires when the user unselects an event by selecting some other event"
---

# onEventUnselected

### Description

@short: Fires when the user unselects an event by selecting some other event

@signature: onEventUnselected: (id: string) =\> void;

### Parameters

- `id` - (required) *string* - the event's id (of the unselected event)

### Example

~~~jsx
scheduler.attachEvent("onEventUnselected", function(id){
    //any custom logic here
});
~~~

### Related API
- [onEventSelected](api/event/oneventselected.md)
