---
sidebar_label: "isOneDayEvent"
title: "isOneDayEvent method"
description: "주어진 이벤트가 하루만 지속되는지 아니면 여러 날에 걸치는지 판단합니다."
---

# isOneDayEvent

### Description

@short: 주어진 이벤트가 하루만 지속되는지 아니면 여러 날에 걸치는지 판단합니다.

@signature: isOneDayEvent: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - 이벤트 객체

### Returns
- ` isOneDay` - (boolean) - 이벤트가 단일 날짜 내에 발생하면 <i>true</i>를 반환하고, 그렇지 않으면 <i>false</i>를 반환합니다.

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-06-2027 09:00",
    end_date:    "16-06-2027 12:00",
    text:    "Meeting"
});
scheduler.isOneDayEvent(scheduler.getEvent(eventId));//->true
~~~
