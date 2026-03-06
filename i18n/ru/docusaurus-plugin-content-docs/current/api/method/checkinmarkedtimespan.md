---
sidebar_label: "checkInMarkedTimespan"
title: "checkInMarkedTimespan method"
description: "определяет, попадает ли событие в интервал времени заданного типа"
---

# checkInMarkedTimespan

### Description

@short: Определяет, попадает ли событие в интервал времени заданного типа

@signature: checkInMarkedTimespan: (event: any, timespan: string) =\> boolean

### Parameters

- `event` - (required) *object* - объект события    
- `timespan` - (required) *string* - тип интервала времени

### Returns
- `isIn` - (boolean) - <i>true</i>, если событие происходит внутри указанного типа интервала времени

### Example

~~~jsx
scheduler.addMarkedTimespan({
    start_date: new Date(2013,4,1), 
    end_date: new Date(2013,7,1), 
    css: "red_section",
    type:"discount"
});

var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting",
    holder: "John", 
    room:   "5"     
})
...
scheduler.checkInMarkedTimespan(scheduler.getEvent(eventId), "discount"); //->true
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Метод требует активации плагина [limit](guides/extensions-list.md#limit). 
:::
