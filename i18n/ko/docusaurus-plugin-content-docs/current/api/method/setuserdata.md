---
sidebar_label: "setUserData"
title: "setUserData method"
description: "특정 이벤트에 사용자 데이터를 할당합니다"
---

# setUserData

### Description

@short: 특정 이벤트에 사용자 데이터를 할당합니다

@signature: setUserData: (id: string, name: string, value: any) =\> void

### Parameters

- `id` - (required) *string* - 이벤트의 고유 식별자
- `name` - (required) *string* - 사용자 데이터의 키
- `value` - (required) *any* - 사용자 데이터 키와 연관된 값

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-06-2027 09:00",
    end_date:   "16-06-2027 12:00",
    text:   "Meeting"
});

scheduler.setUserData(eventId, "holder", "John");
scheduler.setUserData(eventId, "room", 5);
~~~

### Related API
- [getUserData](api/method/getuserdata.md)
