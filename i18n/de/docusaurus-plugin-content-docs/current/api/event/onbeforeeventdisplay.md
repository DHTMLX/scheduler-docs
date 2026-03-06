---
sidebar_label: "onBeforeEventDisplay"
title: "onBeforeEventDisplay event"
description: "Wird direkt ausgelöst, bevor die Methode 'showEvent' ein bestimmtes Event anzeigt, und ermöglicht es, Code auszuführen, bevor das Event erscheint."
---

# onBeforeEventDisplay

### Description

@short: Wird direkt ausgelöst, bevor die Methode 'showEvent' ein bestimmtes Event anzeigt, und ermöglicht es, Code auszuführen, bevor das Event erscheint.

@signature: onBeforeEventDisplay: (event: object, view: string) =\> boolean

### Parameters

- `event` - (required) *object* - Das Objekt des Events
- `view` - (required) *string* - Der Name der View, die zur Anzeige des Events verwendet wird

### Returns
- ` result` - (boolean) - Bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDisplay", function(event,view){
    //beliebige eigene Logik hier
    return true;
});
~~~

### Related API
- [onAfterEventDisplay](api/event/onaftereventdisplay.md)
