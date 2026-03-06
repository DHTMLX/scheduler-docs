---
sidebar_label: "isOneDayEvent"
title: "isOneDayEvent method"
description: "bestimmt, ob das angegebene Event nur einen Tag dauert oder sich über mehrere Tage erstreckt"
---

# isOneDayEvent

### Description

@short: Bestimmt, ob das angegebene Event nur einen Tag dauert oder sich über mehrere Tage erstreckt

@signature: isOneDayEvent: (event: any) =\> boolean

### Parameters

- `event` - (required) *object* - das Event-Objekt

### Returns
- ` isOneDay` - (boolean) - gibt <i>true</i> zurück, wenn das Event an einem einzigen Tag stattfindet, andernfalls <i>false</i>

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:    "16-06-2013 12:00",
    text:    "Meeting"
});
scheduler.isOneDayEvent(scheduler.getEvent(eventId));//->true
~~~
