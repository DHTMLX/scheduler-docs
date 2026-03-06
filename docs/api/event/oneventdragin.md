---
sidebar_label: onEventDragIn
title: "onEventDragIn event"
description: "fires when a dragged event is moved into the scheduler"
---

# onEventDragIn

### Description

@short: Fires when a dragged event is moved into the scheduler

@signature: onEventDragIn: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - the event's id
- `e` - (required) *Event* - a native event object

### Example

~~~jsx
scheduler.attachEvent("onEventDragIn", function (id, e){
    //any custom logic here
});
~~~

### Details

:::note
 The event fires only in case of drag-n-drop between schedulers. 
:::

### Related Guides
- [Drag-and-Drop Operations](guides/drag-between.md)
