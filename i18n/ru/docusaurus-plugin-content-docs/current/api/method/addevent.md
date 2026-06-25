---
sidebar_label: addEvent
title: "addEvent method"
description: "добавляет новое событие"
---

# addEvent

### Description

@short: Добавляет новое событие

@signature: addEvent: (event: any) => string

### Parameters

- `event` - (required) *object* - объект события

### Returns
- `id` - (string) - идентификатор события

### Example

~~~jsx
scheduler.addEvent({
    start_date: "2027-06-16 09:00",
    end_date: "2027-06-16 12:00",
    text: "Meeting",
    holder: "John", // userdata
    room: "5" // userdata
});
~~~

### Related samples
- [Валидация полей lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)
- [Пользовательское окно события](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

### Details

:::note

Метод вызывает событие [`onEventAdded`](api/event/oneventadded.md) или [`onEventChanged`](api/event/oneventchanged.md).

::: 

Объект события может иметь следующие свойства:

- `start_date` - (*Date,string*) дата начала запланированного события. Если свойство задано как строка, следует использовать формат "%d-%m-%Y %H:%i" (чтобы изменить формат по умолчанию, используйте опцию [`api_date`](api/config/api_date.md)). Для [повторяющихся событий](guides/recurring-events.md) значение свойства `start_date` должно иметь тип Date.
- `end_date` - (*Date,string*) дата завершения запланированного события. Если свойство задано как строка, следует использовать формат "%d-%m-%Y %H:%i" (чтобы изменить формат по умолчанию, используйте опцию [`api_date`](api/config/api_date.md)). Для [повторяющихся событий](guides/recurring-events.md) значение свойства `end_date` должно иметь тип Date.
- `text` - (*string*) текст события.
- `id` - (*string*) идентификатор события. Если не указан, идентификатор события будет сгенерирован автоматически.
- `userdata` - (*hash*) набор пользовательских свойств, представленных в виде пар 'ключ-значение'.

### Related API
- [api_date](api/config/api_date.md)
- [addEventNow](api/method/addeventnow.md)
- [deleteEvent](api/method/deleteevent.md)

### Related Guides
- [Adding/Deleting Events](guides/adding-events.md)