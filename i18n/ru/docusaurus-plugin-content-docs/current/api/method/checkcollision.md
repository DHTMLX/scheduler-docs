---
sidebar_label: "checkCollision"
title: "checkCollision method"
description: "проверяет, пересекается ли заданное событие с каким-либо существующим событием(ями) в тот же временной промежуток"
---

# checkCollision

### Description

@short: Проверяет, пересекается ли заданное событие с каким-либо существующим событием(ями) в тот же временной промежуток

@signature: checkCollision: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - объект события

### Returns
- ` result` - (boolean) - возвращает <i>false</i>, если временной слот события уже занят, иначе возвращает <i>true</i>.

### Example

~~~jsx
var event = {
   text : "New Event",
   start_date : new Date(2013, 02, 20, 10, 00),
   end_date : new Date(2013, 02, 20, 14, 00)
};

var isOccupied = scheduler.checkCollision(event); // возвращает 'true' или 'false'
~~~

### Details

:::note
 Этот метод требует включения плагина [collision](guides/extensions-list.md#collision). 
:::

Имейте в виду, что этот метод вызывает событие [](api/event/oneventcollision.md).

### Related API
- [](api/event/oneventcollision.md)

### Related Guides
- [Предотвращение двойных событий в одном временном слоте](guides/collisions.md)
