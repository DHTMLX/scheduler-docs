---
sidebar_label: "showEvent"
title: "showEvent method"
description: "отображает и выделяет указанный ивент в текущем или выбранном виде"
---

# showEvent

### Description

@short: Отображает и выделяет указанный ивент в текущем или выбранном виде

@signature: showEvent: (id: string, view?: string) =\> void

### Parameters

- `id` - (required) *string* - идентификатор ивента
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

- Стандартные имена видов: 'day', 'week' и 'month'. Чтобы использовать другой вид, укажите его параметр **name**.
- Этот метод вызывает события [onBeforeEventDisplay](api/event/onbeforeeventdisplay.md) и [onAfterEventDisplay](api/event/onaftereventdisplay.md).


Например, после программного добавления нового ивента, вы можете отобразить его в scheduler следующим образом:

~~~js
var eventId = scheduler.addEvent({
    start_date: "08-06-2013 09:00",
    end_date:   "08-06-2013 11:00",
    text:   "Meeting"
});
...
scheduler.showEvent(eventId);
~~~
![showEvent_method](/img/showEvent_method.png)
