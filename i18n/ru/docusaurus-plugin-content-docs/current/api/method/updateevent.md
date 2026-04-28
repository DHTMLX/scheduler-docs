---
sidebar_label: updateEvent
title: "updateEvent метод"
description: "обновляет указанное событие"
---

# updateEvent

### Description

@short: Обновляет указанное событие

@signature: updateEvent: (id: string) =\> void

### Parameters

- `id` - (required) *string* - идентификатор события

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-06-2027 09:00",
    end_date:   "16-06-2027 12:00",
    text:   "Meeting"
});
 
scheduler.getEvent(eventId).text = "Conference"; // обновляет детали события
scheduler.getEvent(id).start_date = new Date();   // изменяет дату начала
scheduler.updateEvent(id);   // перерисовывает обновленное событие
~~~

### Related samples
- [Повторяющиеся события](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
- [Создание message boxes](https://docs.dhtmlx.com/scheduler/samples/09_api/02_dhtmlx_message.html)

### Related API
- [getEvent](api/method/getevent.md)

### Related Guides
- [Интеграция на стороне сервера](guides/server-integration.md#technique)