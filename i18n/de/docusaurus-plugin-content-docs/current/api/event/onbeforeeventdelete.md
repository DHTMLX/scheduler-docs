---
sidebar_label: "onBeforeEventDelete"
title: "onBeforeEventDelete event"
description: "Wird unmittelbar ausgelöst, nachdem der Benutzer auf die Löschen-Schaltfläche klickt (entweder in der Event-Leiste oder im Detailfenster)."
---

# onBeforeEventDelete

### Description

@short: Wird unmittelbar ausgelöst, nachdem der Benutzer auf die Löschen-Schaltfläche klickt (entweder in der Event-Leiste oder im Detailfenster).

@signature: onBeforeEventDelete: (id: string, ev: object) =\> boolean

### Parameters

- `id` - (required) *string* - die ID des Events
- `ev` - (required) *object* - das Datenobjekt des Events

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion für das Event fortgesetzt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDelete", function(id,ev){
    // Hier kann eigene Logik eingefügt werden
    return true;
});
~~~

### Details

Dieses Event kann blockiert werden. Wird *false* zurückgegeben, wird der Standardlöschvorgang abgebrochen.
