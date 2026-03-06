---
sidebar_label: "onEventChanged"
title: "onEventChanged event"
description: "Wird ausgelöst, sobald der Benutzer die Bearbeitung eines Events beendet und die Änderungen speichert (nach dem Klicken der Edit- und Save-Buttons in der Event-Leiste oder im Detailfenster)."
---

# onEventChanged

### Description

@short: Wird ausgelöst, sobald der Benutzer die Bearbeitung eines Events beendet und die Änderungen speichert (nach dem Klicken der Edit- und Save-Buttons in der Event-Leiste oder im Detailfenster).

@signature: onEventChanged: (id: string, ev: object) =\> void;

### Parameters

- `id` - (required) *string* - die ID des Events
- `ev` - (required) *object* - das Event-Objekt

### Example

~~~jsx
scheduler.attachEvent("onEventChanged", function(id,ev){
    //beliebige benutzerdefinierte Logik hier
});
~~~

### Related samples
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)
