---
sidebar_label: getEventEndDate
title: "getEventEndDate метод"
description: "получает дату окончания события"
---

# getEventEndDate
:::warning 
Метод устарел.
:::
### Description

@short: Получает дату окончания события

@signature: getEventEndDate: (id: string) =\> Date

### Parameters

- `id` - (required) *string* - идентификатор события

### Returns
- ` end_date` - (Date) - дата окончания события

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-05-2027 09:00",
    end_date:   "16-05-2027 12:00",
    text:   "Meeting"
});
...
scheduler.getEvent(eventId).end_date; // -> Thu May 16 2027 12:00:00
~~~

### Related API
- [getEventStartDate](api/method/geteventstartdate.md)
- [getEventText](api/method/geteventtext.md)