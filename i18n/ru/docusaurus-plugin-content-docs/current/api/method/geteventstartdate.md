---
sidebar_label: getEventStartDate
title: "getEventStartDate метод"
description: "получает дату начала события"
---

# getEventStartDate
:::warning 
Метод устарел. 
:::
### Description

@short: Получает дату начала события

@signature: getEventStartDate: (id: string) =\> Date

### Parameters

- `id` - (required) *string* - идентификатор события

### Returns
- `start_date` - (Date) - дата начала события

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-05-2027 09:00",
    end_date:   "16-05-2027 12:00",
    text:   "Meeting"
});
...
scheduler.getEvent(eventId).start_date; // -> Thu May 16 2027 09:00:00
~~~

### Related API
- [getEventEndDate](api/method/geteventenddate.md)
- [getEventText](api/method/geteventtext.md)