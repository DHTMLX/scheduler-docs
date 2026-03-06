---
title: "Добавление/Удаление событий"
sidebar_label: "Добавление/Удаление событий"
---

# Добавление/Удаление событий

## Добавление событий {#addingevents}

Существует три способа добавить событие в планировщик:

1. [addEvent](api/method/addevent.md) - создает новое событие и вызывает событие [onEventAdded](api/event/oneventadded.md) или [onEventChanged](api/event/oneventchanged.md);
2. [addEventNow](api/method/addeventnow.md) - создает новое событие и открывает lightbox для подтверждения. Этот метод не вызывает никаких событий;
3. [setEvent](api/method/setevent.md) - добавляет новое событие напрямую в пул данных планировщика без вызова событий.

Рекомендуемый способ - использовать метод [addEvent](api/method/addevent.md):

~~~js
var eventId = scheduler.addEvent({
    start_date: "16-06-2019 09:00",
    end_date:   "16-06-2019 12:00",
    text:   "Meeting",
    holder: "John",  // пользовательские данные
    room:   "5"      // пользовательские данные
});
~~~


[Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)


[Default values for lightbox controls](https://docs.dhtmlx.com/scheduler/samples/02_customization/28_lightbox_default_value.html)


## Обновление событий {#updatingevents}

В Scheduler есть два сценария обновления событий:

1. Если вы хотите просто перерисовать событие без отправки изменений на сервер, используйте [updateEvent](api/method/updateevent.md)
2. Если необходимо применить изменения и сохранить их на сервере, лучше использовать метод [addEvent](guides/adding-events.md#addingevents)

~~~js
var eventId = scheduler.addEvent({
    start_date: "16-06-2019 09:00",
    end_date:   "16-06-2019 12:00",
    text:   "Meeting"
});
 
var event = scheduler.getEvent(eventId);
event.text = "Conference"; // обновление данных события

scheduler.updateEvent(event.id); // перерисовать без отправки на сервер
//или
scheduler.addEvent(event.id); // перерисовать и отправить обновление на сервер
~~~

## Удаление событий {#updatingevents}

Чтобы удалить событие из планировщика, используйте метод [deleteEvent](api/method/deleteevent.md):

~~~js
scheduler.parse([
   {id:1, start_date:"06/30/2009 09:00", end_date:"06/30/2009 12:00", text:"Task1"},
   {id:2, start_date:"06/30/2009 12:00", end_date:"06/30/2009 20:00", text:"Task2"}
],"json");
...
scheduler.deleteEvent(2);
~~~

Когда dataProcessor инициализирован, добавленные или удаленные события в планировщике автоматически отражаются в источнике данных. Для получения подробной информации обратитесь к руководству [Интеграция с серверной стороной](guides/server-integration.md).


[Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)
