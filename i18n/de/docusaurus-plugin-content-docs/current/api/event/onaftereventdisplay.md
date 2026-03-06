---
sidebar_label: "onAfterEventDisplay"
title: "onAfterEventDisplay event"
description: "Wird ausgelöst, wenn der Scheduler die Ansicht, Tage, Zeit usw. ändert, um das durch die Methode 'showEvent' angegebene Event anzuzeigen, und zwar NACHDEM das Event angezeigt wurde."
---

# onAfterEventDisplay

### Description

@short: Wird ausgelöst, wenn der Scheduler die Ansicht, Tage, Zeit usw. ändert, um das durch die Methode 'showEvent' angegebene Event anzuzeigen, und zwar NACHDEM das Event angezeigt wurde.

@signature: onAfterEventDisplay: (event: object, string: view) =\> void

### Parameters

- `event` - (required) *object* - Das Event-Objekt
- `view` - (required) *string* - Der Name der View, die zur Anzeige des Events verwendet wird

### Example

~~~jsx
scheduler.attachEvent("onAfterEventDisplay", function(event,view){
    //beliebige benutzerdefinierte Logik hier
});
~~~

### Related API
- [onBeforeEventDisplay](api/event/onbeforeeventdisplay.md)
