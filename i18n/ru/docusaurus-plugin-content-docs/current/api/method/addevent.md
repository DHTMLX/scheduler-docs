---
sidebar_label: addEvent
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
    start_date: "16-06-2027 09:00",
    end_date:    "16-06-2027 12:00",
    text:    "Meeting",
    holder:    "John", // userdata
    room:    "5"     // userdata
});
~~~

### Related samples
- [Валидация полей lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)
- [Пользовательский блок события](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

### Details

:::note

Метод вызывает событие [onEventAdded](api/event/oneventadded.md) или [onEventChanged](api/event/oneventchanged.md)

:::

Объект события может иметь следующие свойства:

- **start_date** - (*Date,string*) дата начала события. Если свойство задано как строка, следует использовать формат "%d-%m-%Y %H:%i" (чтобы изменить формат по умолчанию, используйте опцию [api_date](api/config/api_date.md)). Для [recurring events](guides/recurring-events.md) значение свойства **start_date** должно иметь тип Date.
- **end_date** - (*Date,string*) дата завершения события. Если свойство задано как строка, следует использовать формат "%d-%m-%Y %H:%i" (чтобы изменить формат по умолчанию, используйте опцию [api_date](api/config/api_date.md)). Для [recurring events](guides/recurring-events.md) значение свойства **end_date** должно иметь тип Date.
- **text** - (*string*) текст события.
- **id** - (*string*) идентификатор события. Если не указан, идентификатор события будет сгенерирован автоматически.
- **userdata** - (*hash*) набор пользовательских свойств, представленный в виде пар 'ключ-значение'.

### Related API
- [api_date](api/config/api_date.md)
- [addEventNow](api/method/addeventnow.md)
- [deleteEvent](api/method/deleteevent.md)

### Related Guides
- [Добавление/Удаление событий](guides/adding-events.md)