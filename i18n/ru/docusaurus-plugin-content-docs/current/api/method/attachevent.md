---
sidebar_label: "attachEvent"
title: "attachEvent method"
description: "привязывает обработчик к внутреннему событию dhtmlxScheduler"
---

# attachEvent

### Description

@short: Привязывает обработчик к внутреннему событию dhtmlxScheduler

@signature: attachEvent: (name: SchedulerEventName, handler: SchedulerCallback, settings?: any) =\> string

### Parameters

- `name` - (required) *SchedulerEventName* - имя события, регистронезависимое
- `handler` - (required) *function* - функция, которая будет обрабатывать событие
- `settings` - (optional) *object* - необязательно, [объект с настройками](#propertiesofsettingsobject) для обработчика события

### Returns
- `event` - (string) - id идентификатор привязанного обработчика события

### Example

~~~jsx
scheduler.attachEvent("onEventSave",function(id,ev){
    if (!ev.text) {
        alert("Текст не должен быть пустым");
        return false;
    }
    return true;
})
~~~

### Related samples
- [Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

### Details

К одному событию можно привязать несколько обработчиков, и все они будут выполнены.<br> Если любой из обработчиков возвращает *false*, связанное действие будет отменено.<br>
Обработчики вызываются в порядке их привязки.

Все слушатели событий, добавленные через [event](api/method/event.md), будут автоматически удалены при вызове [destructor](api/method/destructor.md).

## Свойства объекта settings {#propertiesofsettingsobject}

Объект settings может содержать два свойства:

1\. **id** - (*string*) уникальный идентификатор обработчика события 

Это позволяет легко удалить конкретный обработчик из события:

~~~js
scheduler.attachEvent("onClick", function(){
    console.log("event click");
}, {id: "my-click"}); /*!*/
... //позже:
gantt.detachEvent("my-click");
~~~

2\. **once** - (*boolean*) указывает, должен ли обработчик выполниться только один раз

Установите это значение в *true*, чтобы обработать только первое возникновение события, например так:

~~~js
scheduler.attachEvent("onClick", function(){
    console.log("capture next event click");
    return true;
}, {once: true}); /*!*/
~~~

### Related API
- [detachEvent](api/method/detachevent.md)
