---
sidebar_label: isOneDayEvent
title: "Метод isOneDayEvent"
description: "проверяет, является ли указанное событие однодневным или многодневным"
---

# isOneDayEvent

### Description

@short: Проверяет, является ли указанное событие однодневным или многодневным

@signature: isOneDayEvent: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - объект события

### Returns
- ` isOneDay` - (boolean) - возвращает <i>true</i>, если указанное событие однодневное. В противном случае <i>false</i>

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-06-2027 09:00",
    end_date:    "16-06-2027 12:00",
    text:    "Meeting"
});
scheduler.isOneDayEvent(scheduler.getEvent(eventId));//->true
~~~