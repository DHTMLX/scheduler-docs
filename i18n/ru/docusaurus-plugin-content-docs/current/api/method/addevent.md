---
sidebar_label: "addEvent"
title: "addEvent method"
description: "добавляет новое событие"
---

# addEvent

### Description

@short: Добавляет новое событие

@signature: addEvent: (event: any) =\> string

### Parameters

- `event` - (required) *object* - объект события

### Returns
- ` id` - (string) - идентификатор события

### Example

~~~jsx
scheduler.addEvent({
    start_date: "16-06-2013 09:00",
    end_date:    "16-06-2013 12:00",
    text:    "Meeting",
    holder:    "John", // userdata
    room:    "5"     // userdata
});
~~~

### Related samples
- [Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)
- [Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

### Details

:::note

Метод вызывает событие [onEventAdded](api/event/oneventadded.md) или [onEventChanged](api/event/oneventchanged.md)
 
:::

Объект события может включать следующие свойства:

- **start_date** - (*Date,string*) дата начала события. Если указана строкой, она должна соответствовать формату "%d-%m-%Y %H:%i" (для настройки формата по умолчанию смотрите опцию [api_date](api/config/api_date.md)). Для [повторяющихся событий](guides/recurring-events.md) **start_date** должен быть типа Date.    
- **end_date** - (*Date,string*) дата окончания события. Если указана строкой, должна использовать формат "%d-%m-%Y %H:%i" (для изменения формата по умолчанию смотрите опцию [api_date](api/config/api_date.md)). Для [повторяющихся событий](guides/recurring-events.md) **end_date** должен быть типа Date.
- **text** - (*string*) описание события.
- **id** - (*string*) идентификатор события. Если не указан, будет сгенерирован автоматически.
- **userdata** - (*hash*) набор пользовательских свойств в формате 'ключ-значение'.

### Related API
- [api_date](api/config/api_date.md)
- [addEventNow](api/method/addeventnow.md)
- [deleteEvent](api/method/deleteevent.md)

### Related Guides
- [Добавление/Удаление событий](guides/adding-events.md)
