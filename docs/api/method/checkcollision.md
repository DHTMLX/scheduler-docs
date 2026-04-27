---
sidebar_label: checkCollision
title: "checkCollision method"
description: "checks whether the specified event occurs at the time that has already been occupied by another event(s)"
---

# checkCollision

### Description

@short: Checks whether the specified event occurs at the time that has already been occupied by another event(s)

@signature: checkCollision: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - the event object

### Returns
- ` result` - (boolean) - returns <i>false</i>, if the event time has already been occupied, otherwise - <i>true</i>.

### Example

~~~jsx
const event = {
   text : "New Event",
   start_date : new Date(2027, 02, 20, 10, 00),
   end_date : new Date(2027, 02, 20, 14, 00)
};

const isOccupied = scheduler.checkCollision(event); // returns 'true' or 'false'
~~~

### Details

:::note
 The method requires the [collision](guides/extensions-list.md#collision) plugin to be activated. 
:::

Note, the method invokes the [onEventCollision](api/event/oneventcollision.md) event.

### Related API
- [](api/event/oneventcollision.md)

### Related Guides
- [Preventing Double Events in a Time Slot](guides/collisions.md)
