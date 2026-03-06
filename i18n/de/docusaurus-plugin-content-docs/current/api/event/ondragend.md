---
sidebar_label: "onDragEnd"
title: "onDragEnd event"
description: "Wird ausgelöst, wenn die Drag- oder Resize-Aktion abgeschlossen ist"
---

# onDragEnd

### Description

@short: Wird ausgelöst, wenn die Drag- oder Resize-Aktion abgeschlossen ist

@signature: onDragEnd: (id: string, mode: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - die Kennung des Events
- `mode` - (required) *string* - der Typ der Dragging-Aktion: "move", "resize" oder "create"
- `e` - (required) *Event* - das native Event-Objekt

### Example

~~~jsx
var dragged_event;
scheduler.attachEvent("onBeforeDrag", function (id, mode, e){
    // Dies hilft, das gerade gezogene Event zu erfassen
    dragged_event = scheduler.getEvent(id); 
    return true;
});

scheduler.attachEvent("onDragEnd", function(id, mode, e){
    var event_obj = dragged_event;
    // Hier können Sie Ihre eigene Logik einfügen
});
~~~

### Related API
- [onBeforeDrag](api/event/onbeforedrag.md)
