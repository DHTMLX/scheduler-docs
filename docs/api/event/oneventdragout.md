---
sidebar_label: onEventDragOut
title: "onEventDragOut event"
description: "fires when a dragged event is moved out of the scheduler"
---

# onEventDragOut

### Description

@short: Fires when a dragged event is moved out of the scheduler

@signature: onEventDragOut: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - the event's id
- `e` - (required) *Event* - a native event object

### Example

~~~jsx
scheduler.attachEvent("onEventDragOut", function (id, e){
    //any custom logic here
});
~~~

### Details

:::note
 The event fires only in case of drag-n-drop between schedulers. 
:::

### Related Guides
- [Drag-and-Drop Operations](guides/drag-between.md)
