---
sidebar_label: "setEventEndDate"
title: "setEventEndDate method"
description: "обновляет дату окончания события"
---

# setEventEndDate
:::warning
Эта функицональность устарела
::: 
### Description

@short: Обновляет дату окончания события

@signature: setEventEndDate: (id: string, date: Date) =\> void

### Parameters

- `id` - (required) *string* - уникальный идентификатор события  
- `date` - (required) *Date* - обновленная дата окончания события

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: new Date(2013,1,10),
    end_date:   new Date(2013,1,13),
    text:   "Conference"
});
...
scheduler.getEvent(eventId).end_date = new Date(2013,1,15);    
scheduler.updateEvent(eventId);
~~~

### Related API
- [setEventStartDate](api/method/seteventstartdate.md)
