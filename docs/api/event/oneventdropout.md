---
sidebar_label: onEventDropOut
title: "onEventDropOut event"
description: "fires when a dragged event is dropped onto the area out of the scheduler"
---

# onEventDropOut

### Description

@short: Fires when a dragged event is dropped onto the area out of the scheduler

@signature: onEventDragOut: (id: string, ev: object, to: object, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - the event's id 
- `ev` - (required) *object* - the event's object
- `to` - (required) *object* - the target scheduler(null, if dropped to an empty area)
- `e` - (required) *Event* - a native event object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onEventDropOut", function (id, ev, to, e){
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
