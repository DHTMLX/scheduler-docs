---
sidebar_label: "setEventEndDate"
title: "setEventEndDate method"
description: "이벤트의 종료 날짜를 업데이트합니다."
---

# setEventEndDate
:::warning 
이 기능은 더 이상 지원되지 않습니다.
:::
### Description

@short: 이벤트의 종료 날짜를 업데이트합니다.

@signature: setEventEndDate: (id: string, date: Date) =\> void

### Parameters

- `id` - (required) *string* - 이벤트의 고유 식별자
- `date` - (required) *Date* - 업데이트할 이벤트의 종료 날짜

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
