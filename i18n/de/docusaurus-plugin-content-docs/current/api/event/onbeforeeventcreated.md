---
sidebar_label: "onBeforeEventCreated"
title: "onBeforeEventCreated event"
description: "Wird ausgelöst, wenn ein Benutzer ein neues Event erstellt, indem er den Cursor über den Scheduler zieht."
---

# onBeforeEventCreated

### Description

@short: Wird ausgelöst, wenn ein Benutzer ein neues Event erstellt, indem er den Cursor über den Scheduler zieht.

@signature: onBeforeEventCreated: (e: Event) =\> boolean

### Parameters

- `e` - (required) *Event* - ein natives Event-Objekt

### Returns
- ` result` - (boolean) - gibt an, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventCreated", function (e){
    //hier kann benutzerdefinierte Logik hinzugefügt werden
    return true;
});
~~~

### Details

Beachten Sie, dass dieses Event nur ausgelöst wird, wenn die Konfigurationsoption [drag_create](api/config/drag_create.md) aktiviert ist.
