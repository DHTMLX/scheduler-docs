---
sidebar_label: getRecDates
title: "getRecDates method"
description: "returns all occurrences of a recurring event"
---

# getRecDates

### Description

@short: Returns all occurrences of a recurring event

@signature: getRecDates: (id: string, number: number) =\> any

### Parameters

- `id` - (required) *string* - the id of a recurring event
- `number` - (required) *number* - the maximum number of occurrences to return (by default, 100)

### Returns
- ` event` - (object) - an object with 2 properties: <ul><li><b>start_date</b> - (<i>Date</i>) the start date of a single occurrence </li> <li><b>end_date</b> - (<i>Date</i>) the end date of a single occurrence</li></ul>

### Example

~~~jsx
const dates = scheduler.getRecDates(22);
~~~

### Details

:::note
 The property requires the [recurring](guides/extensions-list.md#recurring) extension to be enabled. 
:::

For example, there is a recurring event (id: 22) which takes place every 2 days from 14.00 till 15.00, starting from 12th November, 2027; there are 3 occurrences in total. The [getRecDates](api/method/getrecdates.md) 
method for this event will return the following array:


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
