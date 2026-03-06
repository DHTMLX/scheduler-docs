---
sidebar_label: onEventDrag
title: "onEventDrag event"
description: "fires when the user drags/resizes events in the scheduler"
---

# onEventDrag

### Description

@short: Fires when the user drags/resizes events in the scheduler

@signature: onEventDrag: (id: string, mode: string, ev: Event) =\> void;

### Parameters

- `id` - (required) *string* - the event's id
- `mode` - (required) *string* - the dragging mode: "move","resize" or "new-size" (creating new events)
- `e` - (required) *Event* - a native event object

### Example

~~~jsx
scheduler.attachEvent("onEventDrag", function (id, mode, e){
    //any custom logic here
});
~~~

### Related samples
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)
- [Read-only events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Details

Modes description:

- **move** - the user drags the event over the scheduler.
- **resize** - the user resizes the event by drag-and-drop.
- **new-size** - the user creates a new event by drag-and-drop.
