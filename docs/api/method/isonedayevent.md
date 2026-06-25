---
sidebar_label: isOneDayEvent
title: "isOneDayEvent method"
description: "checks whether the specified event one-day or multi-day"
---

# isOneDayEvent

### Description

@short: Checks whether the specified event one-day or multi-day

@signature: isOneDayEvent: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - the event object

### Returns
- ` isOneDay` - (boolean) - returns <i>true</i>, if the specified event is one-day. Otherwise, <i>false</i>

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-06-2027 09:00",
    end_date:    "16-06-2027 12:00",
    text:    "Meeting"
});
scheduler.isOneDayEvent(scheduler.getEvent(eventId));//->true
~~~
