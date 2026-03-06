---
sidebar_label: "onConfirmedBeforeEventDelete"
title: "onConfirmedBeforeEventDelete event"
description: "Wird ausgelöst, sobald der Benutzer auf den Löschen-Button klickt und die Löschung bestätigt (entweder in der Event-Leiste oder im Detailfenster)."
---

# onConfirmedBeforeEventDelete

### Description

@short: Wird ausgelöst, sobald der Benutzer auf den Löschen-Button klickt und die Löschung bestätigt (entweder in der Event-Leiste oder im Detailfenster).

@signature: onConfirmedBeforeEventDelete: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - die ID des Events
- `e` - (required) *Event* - ein natives Event-Objekt

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion für das Event ausgeführt wird (<b>true</b>) oder gestoppt wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onConfirmedBeforeEventDelete", function(id,e){
    // benutzerdefinierte Logik kann hier eingefügt werden
    return true;
});
~~~

### Details

Dieses Event kann blockiert werden. Die Rückgabe von *false* verhindert, dass das Standardverhalten ausgeführt wird.
