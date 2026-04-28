---
sidebar_label: checkInMarkedTimespan
title: "checkInMarkedTimespan метод"
description: "проверяет, принадлежит ли событие временному интервалу определенного типа"
---

# checkInMarkedTimespan

### Description

@short: Проверяет, принадлежит ли событие временному интервалу определенного типа

@signature: checkInMarkedTimespan: (event: any, timespan: string) =\> boolean

### Parameters

- `event` - (required) *object* - объект события    
- `timespan` - (required) *string* - тип временнóго интервала

### Returns
- `isIn` - (boolean) - <i>true</i>, если событие находится в временном интервале указанного типа

### Example

~~~jsx
scheduler.addMarkedTimespan({
    start_date: new Date(2027,4,1), 
    end_date: new Date(2027,7,1), 
    css: "red_section",
    type:"discount"
});

const eventId = scheduler.addEvent({
    start_date: "16-05-2027 09:00",
    end_date:   "16-05-2027 12:00",
    text:   "Meeting",
    holder: "John", 
    room:   "5"     
})
...
scheduler.checkInMarkedTimespan(scheduler.getEvent(eventId), "discount"); //->true
~~~ 

**Доступные представления:** [Timeline view](views/timeline.md)

### Details

:::note
 Метод требует активированного плагина [limit](guides/extensions-list.md#limit).
:::