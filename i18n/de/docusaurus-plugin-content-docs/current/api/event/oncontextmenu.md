---
sidebar_label: "onContextMenu"
title: "onContextMenu event"
description: "Wird ausgelöst, wenn der Benutzer das Kontextmenü durch einen Rechtsklick innerhalb des Schedulers öffnet."
---

# onContextMenu

### Description

@short: Wird ausgelöst, wenn der Benutzer das Kontextmenü durch einen Rechtsklick innerhalb des Schedulers öffnet.

@signature: onContextMenu: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - die ID des Events
- `e` - (required) *Event* - das native Event-Objekt

### Example

~~~jsx
scheduler.attachEvent("onContextMenu", function (id, e){
    // Hier kann benutzerdefinierte Logik hinzugefügt werden
});
~~~

### Related samples
- [Integration with dhtmlxMenu](https://docs.dhtmlx.com/scheduler/samples/10_integration/01_dhtmlxmenu.html)

### Details

Wenn der Benutzer mit der rechten Maustaste auf ein Event klickt, erhält der Handler die ID des Events; andernfalls ist der Wert null.
