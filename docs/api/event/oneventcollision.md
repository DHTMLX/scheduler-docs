---
sidebar_label: onEventCollision
title: "onEventCollision event"
description: "fires when the user tries to create a new event (or modify some existing one) inside of some already occupied time slot"
---

# onEventCollision

### Description

@short: Fires when the user tries to create a new event (or modify some existing one) inside of some already occupied time slot

@signature: onEventCollision: (ev: object, evs: array) =\> boolean;

### Parameters

- `ev` - (required) *object* - the event object
- `evs` - (required) *array* - a collection of events' objects which already occupy the same time-slot

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onEventCollision", function (ev, evs){
    //any custom logic here
    return true;
});
~~~

### Details

:::note
 The event requires the [collision](guides/extensions-list.md#collision) plugin to be activated. 
:::

Returning <i>true</i> from the handler function blocks the event from being added/edited. Returning <i>false</i> - allows the collision, i.e. adding/editing events.
