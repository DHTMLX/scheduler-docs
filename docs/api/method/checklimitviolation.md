---
sidebar_label: checkLimitViolation
title: "checkLimitViolation method"
description: "checks whether the specified event takes place at the blocked time period"
---

# checkLimitViolation

### Description

@short: Checks whether the specified event takes place at the blocked time period

@signature: checkLimitViolation: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - the event object

### Returns
- `isBlocked` - (boolean) - returns <i>true</i>, if the event occurs at the blocked time, otherwise - <i>false</i>.

### Example

~~~jsx
var event = {
   text : "New Event",
   start_date : new Date(2013, 02, 20, 10, 00),
   end_date : new Date(2013, 02, 20, 14, 00)
};

var isBlocked = scheduler.checkLimitViolation(event); //returns 'true' or 'false'
~~~

### Details

:::note
 The method requires the [limit](guides/extensions-list.md#limit) plugin to be activated. 
:::

Note, the method invokes the [onLimitViolation](api/event/onlimitviolation.md) event.

### Related API
- [](api/event/onlimitviolation.md)
