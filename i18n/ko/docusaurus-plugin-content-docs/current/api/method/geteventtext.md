---
sidebar_label: "getEventText"
title: "getEventText method"
description: "이벤트와 연관된 텍스트를 가져옵니다"
---

# getEventText
:::warning 
이 기능은 더 이상 지원되지 않습니다.
:::
### Description

@short: 이벤트와 연관된 텍스트를 가져옵니다

@signature: getEventText: (id: string) =\> string

### Parameters

- `id` - (required) *string* - 이벤트의 식별자

### Returns
- ` start_date` - (string) - 이벤트의 텍스트

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
