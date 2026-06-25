---
sidebar_label: "getEventEndDate"
title: "getEventEndDate method"
description: "이벤트의 종료 날짜를 가져옵니다"
---

# getEventEndDate
:::warning 
이 기능은 더 이상 지원되지 않습니다.
:::
### Description

@short: 이벤트의 종료 날짜를 가져옵니다

@signature: getEventEndDate: (id: string) =\> Date

### Parameters

- `id` - (required) *string* - 이벤트의 ID

### Returns
- ` end_date` - (Date) - 이벤트의 종료 날짜

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-05-2027 09:00",
    end_date:   "16-05-2027 12:00",
    text:   "Meeting"
});
...
scheduler.getEvent(eventId).end_date; // -> Su May 16 2027 12:00:00
~~~

### Related API
- [getEventStartDate](api/method/geteventstartdate.md)
- [getEventText](api/method/geteventtext.md)
