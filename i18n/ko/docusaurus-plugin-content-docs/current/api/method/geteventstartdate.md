---
sidebar_label: "getEventStartDate"
title: "getEventStartDate method"
description: "이벤트의 시작 날짜를 가져옵니다"
---

# getEventStartDate
:::warning 
이 기능은 더 이상 지원되지 않습니다.
:::
### Description

@short: 이벤트의 시작 날짜를 가져옵니다

@signature: getEventStartDate: (id: string) =\> Date

### Parameters

- `id` - (required) *string* - 이벤트의 고유 식별자

### Returns
- ` start_date` - (Date) - 이벤트의 시작 날짜와 시간

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-05-2027 09:00",
    end_date:   "16-05-2027 12:00",
    text:   "Meeting"
});
...
scheduler.getEvent(eventId).start_date; // -> Su May 16 2027 09:00:00
~~~

### Related API
- [getEventEndDate](api/method/geteventenddate.md)
- [getEventText](api/method/geteventtext.md)
