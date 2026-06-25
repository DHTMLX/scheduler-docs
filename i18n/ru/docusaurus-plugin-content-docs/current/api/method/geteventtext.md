---
sidebar_label: getEventText
title: "метод getEventText"
description: "получает текст события"
---

# getEventText
:::warning 
Метод устарел.
:::
### Description

@short: Получает текст события

@signature: getEventText: (id: string) =\> string

### Parameters

- `id` - (обязательный) *string* - идентификатор события

### Returns
- ` start_date` - (string) - текст события

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-05-2027 09:00",
    end_date:   "16-05-2027 12:00",
    text:   "Meeting"
});
...
scheduler.getEvent(eventId).text; // -> "Meeting"
~~~

### Related API
- [getEventEndDate](api/method/geteventenddate.md)
- [getEventStartDate](api/method/geteventstartdate.md)