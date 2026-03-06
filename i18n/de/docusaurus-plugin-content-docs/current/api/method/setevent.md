---
sidebar_label: "setEvent"
title: "setEvent method"
description: "Fügt dem Datenpool des Schedulers ein neues Event hinzu"
---

# setEvent

### Description

@short: Fügt dem Datenpool des Schedulers ein neues Event hinzu

@signature: setEvent: (id: string|number, event: any) =\> void

### Parameters

- `id` - (required) *string | number* -    die ID des Events
- `event` - (required) *object* - das Event-Objekt

### Example

~~~jsx
scheduler.setEvent(1, {
    start_date: new Date(2013, 05, 16, 09, 00),
    end_date:   new Date(2013, 05, 16, 12, 00),
    text:   "Meeting",
    holder: "John", 
    room:   "5"     
});
scheduler.setCurrentView();
~~~

### Details

Diese Methode funktioniert ähnlich wie [addEvent](api/method/addevent.md).

Der wesentliche Unterschied zwischen **setEvent()** und **addEvent()** ist:

- Die Methode [addEvent](api/method/addevent.md) fügt das Event zur Scheduler-Ansicht hinzu und löst die Events [onEventAdded](api/event/oneventadded.md) / [onEventChanged](api/event/oneventchanged.md) aus, die genutzt werden können, um die ursprüngliche Datenquelle (z.B. eine Datenbank) zu aktualisieren.
- Die Methode **setEvent()** fügt das Event lediglich dem internen Datenpool hinzu, ohne irgendwelche Events auszulösen. Um die Scheduler-Ansicht mit dem neuen Event zu aktualisieren, muss [setCurrentView](api/method/setcurrentview.md) separat aufgerufen werden.

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [addEvent](api/method/addevent.md)
- [onEventAdded](api/event/oneventadded.md)
- [onEventChanged](api/event/oneventchanged.md)

### Related Guides
- [Hinzufügen/Löschen von Ereignissen](guides/adding-events.md)
