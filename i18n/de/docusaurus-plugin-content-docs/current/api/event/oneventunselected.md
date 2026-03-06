---
sidebar_label: "onEventUnselected"
title: "onEventUnselected event"
description: "wird ausgelöst, wenn ein Benutzer ein Event abwählt, indem er ein anderes auswählt"
---

# onEventUnselected

### Description

@short: Wird ausgelöst, wenn ein Benutzer ein Event abwählt, indem er ein anderes auswählt

@signature: onEventUnselected: (id: string) =\> void;

### Parameters

- `id` - (required) *string* - die ID des abgewählten Events

### Example

~~~jsx
scheduler.attachEvent("onEventUnselected", function(id){
    //beliebige benutzerdefinierte Logik hier
});
~~~

### Related API
- [onEventSelected](api/event/oneventselected.md)
