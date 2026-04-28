---
sidebar_label: checkCollision
title: "checkCollision метод"
description: "проверяет, происходит ли указанное событие во время, которое уже занято другим(и) событием(ями)"
---

# checkCollision

### Description

@short: Проверяет, пересекается ли заданное событие с каким-либо существующим событием(ями) в тот же временной промежуток

@signature: checkCollision: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - объект события

### Returns
- `result` - (boolean) - возвращает <i>false</i>, если время события уже занято, иначе - <i>true</i>.

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
 Этот метод требует включения плагина [collision](guides/extensions-list.md#collision). 
:::

Note, the method invokes the [onEventCollision](api/event/oneventcollision.md) event.

### Related API
- [](api/event/oneventcollision.md)

### Related Guides
- [Предотвращение двойных событий в временном интервале](guides/collisions.md)