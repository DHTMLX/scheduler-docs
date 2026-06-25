---
sidebar_label: "checkCollision"
title: "checkCollision method"
description: "prüft, ob das angegebene Event mit einem oder mehreren bestehenden Events während desselben Zeitraums kollidiert"
---

# checkCollision

### Description

@short: Prüft, ob das angegebene Event mit einem oder mehreren bestehenden Events während desselben Zeitraums kollidiert

@signature: checkCollision: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - das Event-Objekt

### Returns
- ` result` - (boolean) - gibt <i>false</i> zurück, wenn der Zeitabschnitt des Events bereits belegt ist, ansonsten <i>true</i>.

### Example

~~~jsx
var event = {
   text : "New Event",
   start_date : new Date(2027, 02, 20, 10, 00),
   end_date : new Date(2027, 02, 20, 14, 00)
};

var isOccupied = scheduler.checkCollision(event); // gibt 'true' oder 'false' zurück
~~~

### Details

:::note
 Diese Methode erfordert, dass das [collision](guides/extensions-list.md#collision) Plugin aktiviert ist. 
:::

Beachten Sie, dass diese Methode das Event [](api/event/oneventcollision.md) auslöst.

### Related API
- [](api/event/oneventcollision.md)

### Related Guides
- [Verhindern von doppelten Ereignissen in einem Zeitfenster](guides/collisions.md)
