---
sidebar_label: onBeforeDrag
title: "onBeforeDrag event"
description: "fires when the user starts the drag/resize operation (version 2.1+)"
---

# onBeforeDrag

### Description

@short: Fires when the user starts the drag/resize operation (version 2.1+)

@signature: onBeforeDrag: (id: string, mode: string, e: Event) =\> boolean

### Parameters

- `id` - (required) *string* - the event's id
- `mode` - (required) *string* - the dragging mode: "move","resize" or "create"
- `e` - (required) *Event* - a native event object

### Returns
- `result` - (boolean) - defines whether the default action of the event will be triggered (`true`) or canceled (`false`)

### Example

~~~jsx
scheduler.attachEvent("onBeforeDrag", (id, mode, e) => {
    // any custom logic here
    return true;
});
~~~

### Related samples
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)
- [Read-only events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)

### Details

The event fires when the user clicks inside the Scheduler on the element that can be dragged.

For the "create" mode, the `id` value is not provided, because a new event is not created yet.
