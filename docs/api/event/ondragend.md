---
sidebar_label: onDragEnd
title: "onDragEnd event"
description: "fires when the drag/resize operation is finished"
---

# onDragEnd

### Description

@short: Fires when the drag/resize operation is finished

@signature: onDragEnd: (id: string, mode: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - the event's id
- `mode` - (required) *string* - the dragging mode: "move","resize" or "create"
- `e` - (required) *Event* - a native event object

### Example

~~~jsx
let dragged_event;
scheduler.attachEvent("onBeforeDrag", function (id, mode, e){
    // use it to get the object of the dragged event
    dragged_event = scheduler.getEvent(id); 
    return true;
});

scheduler.attachEvent("onDragEnd", function(id, mode, e){
    let event_obj = dragged_event;
    // your custom logic
});
~~~

### Related API
- [onBeforeDrag](api/event/onbeforedrag.md)
