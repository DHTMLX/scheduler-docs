---
sidebar_label: "deleteEvent"
title: "deleteEvent method"
description: "удаляет указанное событие"
---

# deleteEvent

### Description

@short: Удаляет указанное событие

@signature: deleteEvent: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    идентификатор события

### Example

~~~jsx
scheduler.init('scheduler_here',new Date(2009,5,30),"day");
scheduler.parse([
   {id:1, start_date:"06/30/2009 09:00", end_date:"06/30/2009 12:00", text:"Task1"},
   {id:2, start_date:"06/30/2009 12:00", end_date:"06/30/2009 20:00", text:"Task2"},
   {id:3, start_date:"06/30/2009 08:00", end_date:"06/30/2009 12:00", text:"Task3"}
],"json");
...
scheduler.deleteEvent(3);
~~~

### Related samples
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

### Details

Этот метод может принимать второй параметр:

- **silent** - (*boolean*) если установить в *true*, метод **deleteEvent** будет работать только на клиентской стороне, избегая любых запросов к серверу:

~~~js
// удаляет указанное событие только на клиентской стороне
scheduler.deleteEvent(id, true); 
~~~

Второй параметр обычно используется при обработке ошибок сервера.

### Related API
- [addEvent](api/method/addevent.md)
- [addEventNow](api/method/addeventnow.md)

### Related Guides
- [Добавление/Удаление событий](guides/adding-events.md)
