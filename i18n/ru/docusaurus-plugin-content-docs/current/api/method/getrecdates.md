---
sidebar_label: getRecDates
title: "getRecDates метод"
description: "возвращает все появления повторяющегося события"
---

# getRecDates

### Description

@short: Возвращает все появления повторяющегося события

@signature: getRecDates: (id: string, number: number) =\> any

### Parameters

- `id` - (required) *string* - идентификатор повторяющегося события
- `number` - (required) *number* - максимальное количество возвращаемых вхождений (по умолчанию, 100)

### Returns
- ` event` - (object) - объект с двумя свойствами: <ul><li><b>start_date</b> - (<i>Date</i>) дата начала одного появления</li> <li><b>end_date</b> - (<i>Date</i>) дата окончания одного появления</li></ul>

### Example

~~~jsx
const dates = scheduler.getRecDates(22);
~~~

### Details

:::note
 Это свойство требует включения расширения [recurring](guides/extensions-list.md#recurring). 
:::


Например, существует повторяющееся событие (id: 22), которое происходит каждые 2 дня с 14:00 до 15:00, начиная с 12 ноября 2027 года; всего 3 вхождения. Метод [getRecDates](api/method/getrecdates.md) для этого события вернет следующий массив:


~~~js
[
    { 
      start_date: Tue Oct 12 2027 14:00:00 GMT+0300 (E. Europe Daylight Time),
      end_date: Tue Oct 12 2027 15:00:00 GMT+0300 (E. Europe Daylight Time)
    },
    { 
      start_date: Thu Oct 14 2027 14:00:00 GMT+0300 (E. Europe Daylight Time),
      end_date: Thu Oct 14 2027 15:00:00 GMT+0300 (E. Europe Daylight Time)
    },
    { 
      start_date: Sat Oct 16 2027 14:00:00 GMT+0300 (E. Europe Daylight Time),
      end_date: Sat Oct 16 2027 15:00:00 GMT+0300 (E. Europe Daylight Time)
    }
]
~~~