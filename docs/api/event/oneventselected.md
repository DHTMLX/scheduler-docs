---
sidebar_label: onEventSelected
title: "onEventSelected event"
description: "fires when the user selects an event in the scheduler"
---

# onEventSelected

### Description

@short: Fires when the user selects an event in the scheduler

@signature: onEventSelected: (id: string) =\> void;

### Parameters

- `id` - (required) *string* - the event's id

### Example

~~~jsx
scheduler.attachEvent("onEventSelected", function(id){
    //any custom logic here
});
~~~

### Related API
- [onEventUnselected](api/event/oneventunselected.md)
