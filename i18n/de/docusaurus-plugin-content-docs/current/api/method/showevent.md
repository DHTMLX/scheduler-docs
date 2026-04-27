---
sidebar_label: "showEvent"
title: "showEvent method"
description: "zeigt das angegebene Event in der aktuellen oder ausgewählten Ansicht an und hebt es hervor"
---

# showEvent

### Description

@short: Zeigt das angegebene Event in der aktuellen oder ausgewählten Ansicht an und hebt es hervor

@signature: showEvent: (id: string, view?: string) =\> void

### Parameters

- `id` - (required) *string* - die ID des Events
- `view` - (optional) *string* - der Name der Ansicht

### Example

~~~jsx
//zeigt das Event mit 'id=someId' in der Wochen-Ansicht an
scheduler.showEvent(someId,"week");

//zeigt das Event mit 'id=someId' in der aktuell aktiven Ansicht an
scheduler.showEvent(someId);
~~~

### Related samples
- [Making an event currently displayable](https://docs.dhtmlx.com/scheduler/samples/09_api/08_show_event.html)

### Details

- Die Standard-View-Namen sind 'day', 'week' und 'month'. Um eine andere Ansicht zu verwenden, geben Sie deren **Name** als Parameter an.
- Diese Methode löst die Events [onBeforeEventDisplay](api/event/onbeforeeventdisplay.md) und [onAfterEventDisplay](api/event/onaftereventdisplay.md) aus.


Zum Beispiel können Sie nach dem programmatischen Hinzufügen eines neuen Events dieses so im Scheduler anzeigen:

~~~js
const eventId = scheduler.addEvent({
    start_date: "08-06-2027 09:00",
    end_date:   "08-06-2027 11:00",
    text:   "Meeting"
});
...
scheduler.showEvent(eventId);
~~~
![showEvent_method](/img/showEvent_method.png)
