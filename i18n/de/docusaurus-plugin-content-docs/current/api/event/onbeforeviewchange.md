---
sidebar_label: "onBeforeViewChange"
title: "onBeforeViewChange event"
description: "Wird ausgelöst, kurz bevor der Benutzer von der aktuellen Ansicht zu einer anderen wechselt"
---

# onBeforeViewChange

### Description

@short: Wird ausgelöst, kurz bevor der Benutzer von der aktuellen Ansicht zu einer anderen wechselt

@signature: onBeforeViewChange: (old_mode: string, old_date: object, mode: string, date: object) =\> boolean

### Parameters

- `old_mode` - (required) *string* - die aktuell aktive Ansicht
- `old_date` - (required) *object* - das aktuell im Fokus stehende Datum
- `mode` - (required) *string* - die Ansicht, die aktiviert werden soll
- `date` - (required) *object* - das neu ausgewählte Datum

### Returns
- ` result` - (boolean) - gibt an, ob die Standardaktion des Events ausgeführt werden soll (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeViewChange", function(old_mode,old_date,mode,date){
    //Hier kann benutzerdefinierte Logik eingefügt werden
    return true;
});
~~~

### Related samples
- [Configuring the Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

- Dieses Event kann durch Rückgabe von *false* blockiert werden, wodurch der Scheduler in der aktuellen Ansicht bleibt.
- Es wird auch ausgelöst, wenn der Scheduler zum ersten Mal auf der Seite geladen wird; in diesem Fall sind **old_mode** und **old_date** undefiniert.
