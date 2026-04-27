---
sidebar_label: "callEvent"
title: "callEvent method"
description: "Löst ein internes Event aus"
---

# callEvent

### Description

@short: Löst ein internes Event aus

@signature: callEvent: (name: string, params: any[]) =\> boolean

### Parameters

- `name` - (required) *string* - Der Name des Events, nicht case-sensitiv
- `params` - (required) *array* - Ein Array, das die mit dem Event verbundenen Daten enthält

### Returns
- ` result` - (boolean) - <i>false</i>, wenn einer der Event-Handler <i>false</i> zurückgibt. Ansonsten <i>true</i>

### Example

~~~jsx
scheduler.attachEvent("CustomEvent", function(param1, param2){
    return true;
});

const res = scheduler.callEvent("CustomEvent", [param1, param2]);
~~~

### Details

Events werden normalerweise automatisch ausgelöst, daher ist die Verwendung dieser Methode selten notwendig.

### Related API
- [attachEvent](api/method/attachevent.md)
