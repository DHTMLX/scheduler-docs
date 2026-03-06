---
sidebar_label: "isOneDayEvent"
title: "isOneDayEvent method"
description: "определяет, длится ли заданное событие всего один день или охватывает несколько дней"
---

# isOneDayEvent

### Description

@short: Определяет, длится ли заданное событие всего один день или охватывает несколько дней

@signature: isOneDayEvent: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - объект события

### Returns
- ` isOneDay` - (boolean) - возвращает <i>true</i>, если событие происходит в пределах одного дня, иначе возвращает <i>false</i>

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:    "16-06-2013 12:00",
    text:    "Meeting"
});
scheduler.isOneDayEvent(scheduler.getEvent(eventId));//->true
~~~
