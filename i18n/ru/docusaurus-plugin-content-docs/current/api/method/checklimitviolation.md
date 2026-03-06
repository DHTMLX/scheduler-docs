---
sidebar_label: "checkLimitViolation"
title: "checkLimitViolation method"
description: "определяет, пересекается ли заданное событие с заблокированным периодом времени"
---

# checkLimitViolation

### Description

@short: Определяет, пересекается ли заданное событие с заблокированным периодом времени

@signature: checkLimitViolation: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - объект события

### Returns
- `isBlocked` - (boolean) - возвращает <i>true</i>, если событие попадает в заблокированное время, иначе <i>false</i>.

### Example

~~~jsx
var event = {
   text : "New Event",
   start_date : new Date(2013, 02, 20, 10, 00),
   end_date : new Date(2013, 02, 20, 14, 00)
};

var isBlocked = scheduler.checkLimitViolation(event); //возвращает 'true' или 'false'
~~~

### Details

:::note
 Метод требует активации плагина [limit](guides/extensions-list.md#limit). 
:::

Учтите, что этот метод вызывает событие [onLimitViolation](api/event/onlimitviolation.md).

### Related API
- [onLimitViolation](api/event/onlimitviolation.md)
