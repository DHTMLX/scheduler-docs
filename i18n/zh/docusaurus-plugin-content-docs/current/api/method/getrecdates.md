---
sidebar_label: "getRecDates"
title: "getRecDates method"
description: "获取重复事件的所有发生时间"
---

# getRecDates

### Description

@short: 获取重复事件的所有发生时间

@signature: getRecDates: (id: string, number: number) =\> any

### Parameters

- `id` - (required) *string* - 重复事件的标识符
- `number` - (required) *number* - 要获取的最大发生次数（默认值为100）

### Returns
- ` event` - (object) - 一个包含两个属性的对象:<ul><li><b>start_date</b> - (<i>Date</i>) 每次发生的开始时间 </li> <li><b>end_date</b> - (<i>Date</i>) 每次发生的结束时间</li></ul>

### Example

~~~jsx
var dates = scheduler.getRecDates(22);
~~~

### Details

:::note
 此属性需要启用 [recurring](guides/extensions-list.md#recurring) 扩展。 
:::

举例来说，考虑一个重复事件（id: 22），它从2010年11月12日开始，每隔2天发生一次，时间为14:00到15:00，总共发生3次。该事件调用 [getRecDates](api/method/getrecdates.md) 
方法将返回以下数组:


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
