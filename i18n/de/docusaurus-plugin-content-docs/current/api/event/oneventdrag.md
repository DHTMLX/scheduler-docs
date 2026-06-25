---
sidebar_label: onEventDrag
title: "onEventDrag-Ereignis"
description: "Wird ausgelöst, wenn der Benutzer Ereignisse im Scheduler zieht oder deren Größe ändert"
---

# onEventDrag

### Description

@short: Wird ausgelöst, wenn der Benutzer Ereignisse im Scheduler zieht oder deren Größe ändert

@signature: onEventDrag: (id: string, mode: string, e: Event) =\> void;

### Parameters

- `id` - (erforderlich) *string* - die ID des Ereignisses
- `mode` - (erforderlich) *string* - der Drag-Modus: 'move', 'resize' oder 'new-size' (Erstellung neuer Ereignisse)
- `e` - (erforderlich) *Event* - ein natives Event-Objekt

### Example

~~~jsx
scheduler.attachEvent("onEventDrag", (id, mode, e) => {
    // any custom logic here
});
~~~

### Related samples
- [Schreibgeschützte Lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)
- [Schreibgeschützte Ereignisse](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Details

Modes description:

- `move` – Der Benutzer verschiebt das Ereignis im Scheduler
- `resize` – Der Benutzer ändert die Größe des Ereignisses per Drag-and-Drop
- `new-size` – Der Benutzer erstellt durch Drag-and-Drop ein neues Ereignis