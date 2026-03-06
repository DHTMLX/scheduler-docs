---
sidebar_label: "setEventStartDate"
title: "setEventStartDate method"
description: "обновляет дату начала события"
---

# setEventStartDate
:::warning
Эта функицональность устарела
::: 
### Description

@short: Обновляет дату начала события

@signature: setEventStartDate: (id: string, date: Date) =\> void

### Parameters

- `id` - (required) *string* - идентификатор события
- `date` - (required) *Date* - новая дата начала события

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: new Date(2013,1,10),
    end_date:   new Date(2013,1,13),
    text:   "Conference"
});
...
scheduler.getEvent(eventId).start_date = new Date(2013,1,09);
scheduler.updateEvent(eventId);
~~~

### Related API
- [setEventEndDate](api/method/seteventenddate.md)
