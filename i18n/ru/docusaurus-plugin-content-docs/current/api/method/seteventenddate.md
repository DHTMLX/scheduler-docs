---
sidebar_label: setEventEndDate
title: "Метод setEventEndDate"
description: "устанавливает дату окончания события"
---

# setEventEndDate
:::warning 
Метод устарел.
:::
### Description

@short: Устанавливает дату окончания события

@signature: setEventEndDate: (id: string, date: Date) =\> void

### Parameters

- `id` - (required) *string* - идентификатор события
- `date` - (required) *Date* - новая дата окончания события

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: new Date(2027,1,10),
    end_date:   new Date(2027,1,13),
    text:   "Конференция"
});
...
scheduler.getEvent(eventId).end_date = new Date(2027,1,15);    
scheduler.updateEvent(eventId);
~~~

### Related API
- [setEventStartDate](api/method/seteventstartdate.md)