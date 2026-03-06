---
sidebar_label: "getRecDates"
title: "getRecDates method"
description: "반복 이벤트의 모든 발생일을 가져옵니다"
---

# getRecDates

### Description

@short: 반복 이벤트의 모든 발생일을 가져옵니다

@signature: getRecDates: (id: string, number: number) =\> any

### Parameters

- `id` - (required) *string* - 반복 이벤트의 식별자
- `number` - (required) *number* - 가져올 최대 발생 횟수 (기본값은 100)

### Returns
- ` event` - (object) - 2개의 속성을 포함하는 객체: <ul><li><b>start_date</b> - (<i>Date</i>) 각 발생의 시작 날짜 </li> <li><b>end_date</b> - (<i>Date</i>) 각 발생의 종료 날짜</li></ul>

### Example

~~~jsx
var dates = scheduler.getRecDates(22);
~~~

### Details

:::note
 이 속성은 [recurring](guides/extensions-list.md#recurring) 확장이 활성화되어 있어야 합니다. 
:::

예를 들어, 2010년 11월 12일부터 시작하여 2일마다 14:00부터 15:00까지 발생하며 총 3회 반복되는 이벤트(id: 22)가 있다고 가정할 때, 이 이벤트에 대한 [getRecDates](api/method/getrecdates.md) 
메서드는 다음과 같은 배열을 반환합니다:


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
