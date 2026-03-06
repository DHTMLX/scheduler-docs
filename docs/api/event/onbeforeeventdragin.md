---
sidebar_label: onBeforeEventDragIn
title: "onBeforeEventDragIn event"
description: "fires before a dragged event is moved over the scheduler"
---

# onBeforeEventDragIn

### Description

@short: Fires before a dragged event is moved over the scheduler

@signature: onBeforeEventDragIn: (id: string, e: Event) =\> boolean

### Parameters

- `id` - (required) *string* - the event's id
- `e` - (required) *Event* - a native event object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDragIn", function (id, e){
    //any custom logic here
    return true;
});
~~~

### Details

:::note
 The event fires only in case of drag-n-drop between schedulers. 
:::

### Related Guides
- [Drag-and-Drop Operations](guides/drag-between.md)
