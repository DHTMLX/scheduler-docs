---
sidebar_label: "checkLimitViolation"
title: "checkLimitViolation method"
description: "bestellt, ob das angegebene Event mit einem blockierten Zeitraum überschneidet"
---

# checkLimitViolation

### Description

@short: Bestellt, ob das angegebene Event mit einem blockierten Zeitraum überschneidet

@signature: checkLimitViolation: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - das Event-Objekt

### Returns
- `isBlocked` - (boolean) - gibt <i>true</i> zurück, wenn das Event in einen blockierten Zeitraum fällt, andernfalls <i>false</i>.

### Example

~~~jsx
var event = {
   text : "New Event",
   start_date : new Date(2013, 02, 20, 10, 00),
   end_date : new Date(2013, 02, 20, 14, 00)
};

var isBlocked = scheduler.checkLimitViolation(event); //gibt 'true' oder 'false' zurück
~~~

### Details

:::note
 Die Methode erfordert, dass das [limit](guides/extensions-list.md#limit) Plugin aktiviert ist. 
:::

Beachte, dass diese Methode das Event [onLimitViolation](api/event/onlimitviolation.md) auslöst.

### Related API
- [onLimitViolation](api/event/onlimitviolation.md)
