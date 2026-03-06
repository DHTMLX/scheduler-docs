---
sidebar_label: onEventCreated
title: "onEventCreated event"
description: "fires when the user starts to create a new event (by double click or dragging)"
---

# onEventCreated

### Description

@short: Fires when the user starts to create a new event (by double click or dragging)

@signature: onEventCreated: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - the event's id
- `e` - (required) *Event* - a native event object

### Example

~~~jsx
scheduler.attachEvent("onEventCreated", function(id,e){
    //any custom logic here
});
~~~
