---
sidebar_label: onBeforeEventDragOut
title: "onBeforeEventDragOut event"
description: "fires before the dragged event is moved out of the scheduler"
---

# onBeforeEventDragOut

### Description

@short: Fires before the dragged event is moved out of the scheduler

@signature: onBeforeEventDragOut: (id: string, ev: object, e: Event) =\> boolean

### Parameters

- `id` - (required) *string* - the event's id
- `ev` - (required) *object* - the event's data object
- `e` - (required) *Event* - a native event object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDragOut", function (id, ev, e){
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
