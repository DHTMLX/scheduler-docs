---
sidebar_label: onBeforeEventCreated
title: "onBeforeEventCreated event"
description: "fires when the user creates a new event by dragging the cursor over the scheduler"
---

# onBeforeEventCreated

### Description

@short: Fires when the user creates a new event by dragging the cursor over the scheduler

@signature: onBeforeEventCreated: (e: Event) =\> boolean

### Parameters

- `e` - (required) *Event* - a native event object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventCreated", function (e){
    //any custom logic here
    return true;
});
~~~

### Details

Note, the event will fire only if the [drag_create](api/config/drag_create.md) configuration option is enabled.
