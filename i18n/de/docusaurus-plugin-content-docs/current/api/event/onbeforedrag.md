---
sidebar_label: "onBeforeDrag"
title: "onBeforeDrag event"
description: "Wird ausgelöst, wenn der Benutzer eine Drag- oder Resize-Aktion startet (verfügbar seit Version 2.1+)"
---

# onBeforeDrag

### Description

@short: Wird ausgelöst, wenn der Benutzer eine Drag- oder Resize-Aktion startet (verfügbar seit Version 2.1+)

@signature: onBeforeDrag: (id: string, mode: string, e: Event) =\> boolean

### Parameters

- `id` - (required) *string* - Die Kennung des Events
- `mode` - (required) *string* - Der Typ der Drag-Aktion: "move", "resize" oder "create"
- `e` - (required) *Event* - Ein natives Event-Objekt

### Returns
- ` result` - (boolean) - Bestimmt, ob die Standardaktion des Events ausgeführt werden soll (<b>true</b>) oder verhindert wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeDrag", function (id, mode, e){
    // Hier kann eigene Logik eingefügt werden
    return true;
});
~~~

### Related samples
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)
- [Read-only events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Details

Dieses Event wird ausgelöst, wenn der Benutzer im Scheduler auf ein Element klickt, das Dragging unterstützt.

Im Fall des "create"-Modus ist der id-Parameter noch nicht gesetzt, da das neue Event noch nicht erstellt wurde.
