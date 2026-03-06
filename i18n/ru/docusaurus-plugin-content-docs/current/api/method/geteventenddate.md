---
sidebar_label: "getEventEndDate"
title: "getEventEndDate method"
description: "получает дату окончания события"
---

# getEventEndDate
:::warning
Эта функицональность устарела
::: 
### Description

@short: Получает дату окончания события

@signature: getEventEndDate: (id: string) =\> Date

### Parameters

- `id` - (required) *string* - ID события

### Returns
- ` end_date` - (Date) - дата окончания события

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
...
scheduler.getEvent(eventId).end_date; // -> Thu May 16 2013 12:00:00
~~~

### Related API
- [getEventStartDate](api/method/geteventstartdate.md)
- [getEventText](api/method/geteventtext.md)
