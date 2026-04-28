---
sidebar_label: "getUserData"
title: "getUserData method"
description: "특정 이벤트에 연결된 사용자 데이터를 가져옵니다"
---

# getUserData

### Description

@short: 특정 이벤트에 연결된 사용자 데이터를 가져옵니다

@signature: getUserData: (id: string, name: string) =\> any

### Parameters

- `id` - (required) *string* - 이벤트의 ID
- `name` - (required) *string* - 사용자 데이터의 이름

### Returns
- `value` - (any) - 사용자 데이터의 값

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-06-2027 09:00",
    end_date:   "16-06-2027 12:00",
    text:   "Meeting"
});

scheduler.setUserData(eventId, "holder", "John");
...
scheduler.getUserData(eventId, "holder");// ->"John"
~~~

### Related API
- [setUserData](api/method/setuserdata.md)
