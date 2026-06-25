---
sidebar_label: checkLimitViolation
title: "метод checkLimitViolation"
description: "проверяет, происходит ли указанное событие в заблокированном временном периоде"
---

# checkLimitViolation

### Description

@short: Проверяет, происходит ли указанное событие в заблокированном временном периоде

@signature: checkLimitViolation: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - объект события

### Returns
- `isBlocked` - (boolean) - возвращает <i>true</i>, если событие происходит в заблокированное время, иначе - <i>false</i>.

### Example

~~~jsx
const event = {
   text : "New Event",
   start_date : new Date(2013, 02, 20, 10, 00),
   end_date : new Date(2013, 02, 20, 14, 00)
};

const isBlocked = scheduler.checkLimitViolation(event); //возвращает 'true' или 'false'
~~~

### Details

:::note
 Метод требует активации плагина [limit](guides/extensions-list.md#limit) для работы. 
::: 

Примечание: метод вызывает событие [onLimitViolation](api/event/onlimitviolation.md).

### Related API
- [onLimitViolation](api/event/onlimitviolation.md)
