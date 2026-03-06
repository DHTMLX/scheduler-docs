---
sidebar_label: "setEventStartDate"
title: "setEventStartDate method"
description: "이벤트의 시작 날짜를 업데이트합니다."
---

# setEventStartDate
:::warning 
이 기능은 더 이상 지원되지 않습니다.
:::
### Description

@short: 이벤트의 시작 날짜를 업데이트합니다.

@signature: setEventStartDate: (id: string, date: Date) =\> void

### Parameters

- `id` - (required) *string* - 이벤트의 ID
- `date` - (required) *Date* - 이벤트의 새로운 시작 날짜

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
