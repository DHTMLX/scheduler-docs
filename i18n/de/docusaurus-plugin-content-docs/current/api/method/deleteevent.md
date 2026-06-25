---
sidebar_label: "deleteEvent"
title: "deleteEvent method"
description: "entfernt das angegebene Event"
---

# deleteEvent

### Description

@short: Entfernt das angegebene Event

@signature: deleteEvent: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    die ID des Events

### Example

~~~jsx
scheduler.init('scheduler_here',new Date(2027,5,30),"day");
scheduler.parse([
   {id:1, start_date:"06/30/2027 09:00", end_date:"06/30/2027 12:00", text:"Task1"},
   {id:2, start_date:"06/30/2027 12:00", end_date:"06/30/2027 20:00", text:"Task2"},
   {id:3, start_date:"06/30/2027 08:00", end_date:"06/30/2027 12:00", text:"Task3"}
],"json");
...
scheduler.deleteEvent(3);
~~~

### Related samples
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

### Details

Diese Methode kann einen zweiten Parameter akzeptieren:

- **silent** - (*boolean*) Wenn dieser auf *true* gesetzt wird, führt **deleteEvent** die Operation nur auf der Client-Seite aus und vermeidet Serveranfragen:

~~~js
// löscht das angegebene Event nur auf der Client-Seite
scheduler.deleteEvent(id, true); 
~~~

Dieser zweite Parameter wird typischerweise beim Umgang mit Serverfehlern verwendet.

### Related API
- [addEvent](api/method/addevent.md)
- [addEventNow](api/method/addeventnow.md)

### Related Guides
- [Hinzufügen/Löschen von Ereignissen](guides/adding-events.md)
