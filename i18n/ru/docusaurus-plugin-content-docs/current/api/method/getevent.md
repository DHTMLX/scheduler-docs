---
sidebar_label: getEvent
title: "getEvent method"
description: "возвращает объект события по его ID"
---

# getEvent

### Description

@short: Возвращает объект события по его ID

@signature: getEvent: (event_id: string | number) =\> any

### Parameters

- `event_id` - (обязателен) *string | number* - идентификатор события

### Returns
- ` obj` - (object) - объект события

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-05-2027 09:00",
    end_date:   "16-05-2027 12:00",
    text:   "Meeting"
});
...    
const eventObj = scheduler.getEvent(eventId);
~~~

### Related samples
- [Полностью настраиваемый lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)