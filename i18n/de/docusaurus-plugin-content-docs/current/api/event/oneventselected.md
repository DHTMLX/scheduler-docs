---
sidebar_label: "onEventSelected"
title: "onEventSelected event"
description: "Wird ausgelöst, wenn ein Event vom Benutzer im Scheduler ausgewählt wird"
---

# onEventSelected

### Description

@short: Wird ausgelöst, wenn ein Event vom Benutzer im Scheduler ausgewählt wird

@signature: onEventSelected: (id: string) =\> void;

### Parameters

- `id` - (required) *string* - Die ID des ausgewählten Events

### Example

~~~jsx
scheduler.attachEvent("onEventSelected", function(id){
    //beliebige eigene Logik hier
});
~~~

### Related API
- [onEventUnselected](api/event/oneventunselected.md)
