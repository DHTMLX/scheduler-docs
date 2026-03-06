---
sidebar_label: "isOneDayEvent"
title: "isOneDayEvent method"
description: "判断给定事件是否仅持续一天，还是跨越多天"
---

# isOneDayEvent

### Description

@short: 判断给定事件是否仅持续一天，还是跨越多天

@signature: isOneDayEvent: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - 事件对象

### Returns
- ` isOneDay` - (boolean) - 如果事件发生在同一天内，返回<i>true</i>，否则返回<i>false</i>

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:    "16-06-2013 12:00",
    text:    "Meeting"
});
scheduler.isOneDayEvent(scheduler.getEvent(eventId));//->true
~~~
