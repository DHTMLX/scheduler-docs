---
sidebar_label: "getRecDates"
title: "getRecDates method"
description: "получает все повторяющиеся вхождения события"
---

# getRecDates

### Description

@short: Получает все повторяющиеся вхождения события

@signature: getRecDates: (id: string, number: number) =\> any

### Parameters

- `id` - (required) *string* - идентификатор повторяющегося события
- `number` - (required) *number* - максимальное количество вхождений для получения (по умолчанию 100)

### Returns
- ` event` - (object) - объект, содержащий 2 свойства: <ul><li><b>start_date</b> - (<i>Date</i>) дата и время начала каждого вхождения </li> <li><b>end_date</b> - (<i>Date</i>) дата и время окончания каждого вхождения</li></ul>

### Example

~~~jsx
var dates = scheduler.getRecDates(22);
~~~

### Details

:::note
 Это свойство требует включения расширения [recurring](guides/extensions-list.md#recurring). 
:::

В качестве примера рассмотрим повторяющееся событие (id: 22), которое происходит каждые 2 дня с 14:00 до 15:00, начиная с 12 ноября 2010 года, всего 3 раза. Метод [getRecDates](api/method/getrecdates.md) для этого события вернёт следующий массив:


~~~js
[
    { 
      start_date: Tue Oct 12 2010 14:00:00 GMT+0300 (E. Europe Daylight Time),
      end_date: Tue Oct 12 2010 15:00:00 GMT+0300 (E. Europe Daylight Time)
    },
    { 
      start_date: Tue Oct 14 2010 14:00:00 GMT+0300 (E. Europe Daylight Time),
      end_date: Tue Oct 14 2010 15:00:00 GMT+0300 (E. Europe Daylight Time)
    },
    { 
      start_date: Tue Oct 16 2010 14:00:00 GMT+0300 (E. Europe Daylight Time),
      end_date: Tue Oct 16 2010 15:00:00 GMT+0300 (E. Europe Daylight Time)
    }
]

~~~
