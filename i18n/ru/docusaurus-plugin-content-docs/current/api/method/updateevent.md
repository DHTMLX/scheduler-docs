---
sidebar_label: "updateEvent"
title: "updateEvent method"
description: "изменяет указанное событие"
---

# updateEvent

### Description

@short: Изменяет указанное событие

@signature: updateEvent: (id: string) =\> void

### Parameters

- `id` - (required) *string* - идентификатор события

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:   "16-06-2013 12:00",
    text:   "Meeting"
});
 
scheduler.getEvent(eventId).text = "Conference"; // обновляет детали события
scheduler.getEvent(id).start_date = new Date();   // изменяет дату начала
scheduler.updateEvent(id);   // перерисовывает обновленное событие
~~~

### Related samples
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
- [Creating message boxes](https://docs.dhtmlx.com/scheduler/samples/09_api/02_dhtmlx_message.html)

### Related API
- [getEvent](api/method/getevent.md)

### Related Guides
- [Интеграция с серверной стороной](guides/server-integration.md)
