---
sidebar_label: "onDblClick"
title: "onDblClick event"
description: "wird ausgelöst, wenn der Benutzer auf ein Event doppelklickt"
---

# onDblClick

### Description

@short: Wird ausgelöst, wenn der Benutzer auf ein Event doppelklickt

@signature: onDblClick: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - die ID des Events
- `e` - (required) *Event* - ein natives Event-Objekt

### Returns
- ` result` - (boolean) - gibt an, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder verhindert wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onDblClick", function (id, e){
    //beliebige benutzerdefinierte Logik hier
    return true;
})
~~~

### Details

Dieses Event kann blockiert werden. Die Rückgabe von *false* verhindert das Ausführen des Standardverhaltens.
