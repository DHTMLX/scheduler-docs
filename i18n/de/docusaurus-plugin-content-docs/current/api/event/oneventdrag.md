---
sidebar_label: "onEventDrag"
title: "onEventDrag event"
description: "Wird ausgelöst, wenn ein Event innerhalb des Schedulers gezogen oder in der Größe verändert wird"
---

# onEventDrag

### Description

@short: Wird ausgelöst, wenn ein Event innerhalb des Schedulers gezogen oder in der Größe verändert wird

@signature: onEventDrag: (id: string, mode: string, ev: Event) =\> void;

### Parameters

- `id` - (required) *string* - die ID des Events
- `mode` - (required) *string* - der Dragging-Modus: "move", "resize" oder "new-size" (beim Erstellen neuer Events)
- `e` - (required) *Event* - ein natives Event-Objekt

### Example

~~~jsx
scheduler.attachEvent("onEventDrag", function (id, mode, e){
    //benutzerdefinierte Logik kann hier hinzugefügt werden
});
~~~

### Related samples
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)
- [Read-only events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Details

Beschreibung der Modi:

- **move** - das Event wird im Scheduler gezogen.
- **resize** - das Event wird per Drag-and-Drop in der Größe verändert.
- **new-size** - ein neues Event wird per Drag-and-Drop erstellt.
