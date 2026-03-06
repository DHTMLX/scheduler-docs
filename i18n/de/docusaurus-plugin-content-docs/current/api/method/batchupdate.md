---
sidebar_label: "batchUpdate"
title: "batchUpdate method"
description: "aktualisiert mehrere Events gleichzeitig"
---

# batchUpdate

### Description

@short: Aktualisiert mehrere Events gleichzeitig

@signature: batchUpdate: (callback: SchedulerCallback, noRedraw?: boolean) =\> void

### Parameters

- `callback` - (required) *function* - die Callback-Funktion
- `noRedraw` - (optional) *boolean* - optional, bestimmt, ob der Scheduler das Chart nach der Callback-Funktion neu zeichnen soll; <i>true</i> bedeutet kein Neuzeichnen, und <i>false</i> (Standard) bedeutet, dass es neu gezeichnet wird

### Example

~~~jsx
scheduler.batchUpdate(function(){
    const events = scheduler.getEvents();
    for(var i = 0; i < events.length; i++){
        const event = events[i];
        event.start_date = scheduler.date.add(event.start_date, 1, "day");
        event.end_date = scheduler.date.add(event.end_date, 1, "day");
        scheduler.updateEvent(event.id);
    }
});
~~~

### Details

Diese Methode ermöglicht es, mehrere Events gleichzeitig mit nur einem einzigen Neuzeichnen zu aktualisieren, was effizienter ist als mehrere Updates durchzuführen, die jeweils ein eigenes Neuzeichnen auslösen.

### Related API
- [onBeforeBatchUpdate](api/event/onbeforebatchupdate.md)
- [onAfterBatchUpdate](api/event/onafterbatchupdate.md)
