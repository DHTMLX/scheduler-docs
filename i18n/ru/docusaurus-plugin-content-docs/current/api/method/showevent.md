---
sidebar_label: showEvent
title: "showEvent method"
description: "показывает и выделяет указанное событие в текущем или указанном виде просмотра"
---

# showEvent

### Description

@short: Показывает и выделяет указанное событие в текущем или указанном виде просмотра

@signature: showEvent: (id: string, view?: string) =\> void

### Parameters

- `id` - (required) *string* - идентификатор события
- `view` - (optional) *string* - имя вида

### Example

~~~jsx
//отображает ивент с 'id=someId' в виде Week
scheduler.showEvent(someId,"week");

//отображает ивент с 'id=someId' в текущем активном виде
scheduler.showEvent(someId);
~~~

### Related samples
- [Making an event currently displayable](https://docs.dhtmlx.com/scheduler/samples/09_api/08_show_event.html)

### Details

- Названия представлений по умолчанию: 'day', 'week', 'month'. Чтобы указать любое другое представление - используйте его **name** параметр.
- Метод вызывает события [onBeforeEventDisplay](api/event/onbeforeeventdisplay.md) и [onAfterEventDisplay](api/event/onaftereventdisplay.md).


Например, после программного добавления нового ивента, вы можете отобразить его в scheduler следующим образом:

~~~js
const eventId = scheduler.addEvent({
    start_date: "08-06-2027 09:00",
    end_date:   "08-06-2027 11:00",
    text:   "Meeting"
});
...
scheduler.showEvent(eventId);
~~~
![showEvent_method](/img/showEvent_method.png)