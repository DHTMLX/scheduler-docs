---
sidebar_label: "getEventText"
title: "getEventText method"
description: "получает текст, связанный с событием"
---

# getEventText
:::warning
Эта функицональность устарела
::: 
### Description

@short: Получает текст, связанный с событием

@signature: getEventText: (id: string) =\> string

### Parameters

- `id` - (required) *string* - идентификатор события

### Returns
- ` start_date` - (string) - текст события

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
...
scheduler.getEvent(eventId).text; // -> "Meeting"
~~~

### Related API
- [getEventEndDate](api/method/geteventenddate.md)
- [getEventStartDate](api/method/geteventstartdate.md)
