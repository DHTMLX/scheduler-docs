---
sidebar_label: "getRecDates"
title: "getRecDates method"
description: "ruft alle Vorkommnisse eines wiederkehrenden Ereignisses ab"
---

# getRecDates

### Description

@short: Ruft alle Vorkommnisse eines wiederkehrenden Ereignisses ab

@signature: getRecDates: (id: string, number: number) =\> any

### Parameters

- `id` - (required) *string* - die Kennung eines wiederkehrenden Ereignisses
- `number` - (required) *number* - die maximale Anzahl der abzurufenden Vorkommnisse (Standard ist 100)

### Returns
- ` event` - (object) - ein Objekt mit 2 Eigenschaften: <ul><li><b>start_date</b> - (<i>Date</i>) das Startdatum jedes Vorkommnisses </li> <li><b>end_date</b> - (<i>Date</i>) das Enddatum jedes Vorkommnisses</li></ul>

### Example

~~~jsx
const dates = scheduler.getRecDates(22);
~~~

### Details

:::note
 Diese Eigenschaft erfordert, dass die [recurring](guides/extensions-list.md#recurring) Erweiterung aktiviert ist. 
:::

Als Beispiel betrachten wir ein wiederkehrendes Ereignis (id: 22), das alle 2 Tage von 14:00 bis 15:00 Uhr stattfindet, beginnend am 12. November 2027, mit insgesamt 3 Vorkommnissen. Die [getRecDates](api/method/getrecdates.md) 
Methode für dieses Ereignis liefert folgendes Array:


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
