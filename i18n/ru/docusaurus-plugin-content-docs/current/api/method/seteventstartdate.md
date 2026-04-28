---
sidebar_label: setEventStartDate
title: "метод setEventStartDate"
description: "устанавливает дату начала события"
---

# setEventStartDate
:::warning 
Метод устарел.
:::
### Description

@short: Устанавливает дату начала события

@signature: setEventStartDate: (id: string, date: Date) =\> void

### Parameters

- `id` - (required) *string* - идентификатор события
- `date` - (required) *Date* - новая дата начала события

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: new Date(2027,1,10),
    end_date:   new Date(2027,1,13),
    text:   "Conference"
});
...
scheduler.getEvent(eventId).start_date = new Date(2027,1,09);
scheduler.updateEvent(eventId);
~~~

### Related API
- [setEventEndDate](api/method/seteventenddate.md)