---
sidebar_label: "getEventStartDate"
title: "getEventStartDate method"
description: "получает дату начала события"
---

# getEventStartDate
:::warning
Эта функицональность устарела
::: 
### Description

@short: Получает дату начала события

@signature: getEventStartDate: (id: string) =\> Date

### Parameters

- `id` - (required) *string* - уникальный идентификатор события

### Returns
- ` start_date` - (Date) - дата и время начала события

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
...
scheduler.getEvent(eventId).start_date; // -> Thu May 16 2013 09:00:00
~~~

### Related API
- [getEventEndDate](api/method/geteventenddate.md)
- [getEventText](api/method/geteventtext.md)
