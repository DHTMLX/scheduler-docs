--- 
sidebar_label: attachEvent
title: "Метод attachEvent"
description: "прикрепляет обработчик к внутреннему событию dhtmlxScheduler"
---

# attachEvent

### Description

@short: Привязывает обработчик к внутреннему событию dhtmlxScheduler

@signature: attachEvent: (name: SchedulerEventName, handler: SchedulerCallback, settings?: any) =\> string

### Parameters

- `name` - (required) *SchedulerEventName* - имя события, регистронезависимое
- `handler` - (required) *function* - функция-обработчик
- `settings` - (optional) *object* - необязательный, [объект с настройками](#properties-of-settings-object) для обработчика события

### Returns
- `event` - (string) - id прикрепленного обработчика события

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
- [Проверка полей lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)
- [Повторяющиеся события](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

### Details

Можно прикрепить несколько обработчиков к одному и тому же событию, и все они будут выполняться.<br> Если некоторые обработчики вернут *false* — соответствующая операция будет заблокирована.<br>
Обработчики событий обрабатываются в том же порядке, в каком они были прикреплены.

Все слушатели событий, подключенные с помощью [event](api/method/event.md) будут автоматически отсоединены, когда будет вызван [destructor](api/method/destructor.md).

## Свойства объекта настроек

Объект настроек может содержать два свойства:

1\. **id** - (*string*) идентификатор обработчика события 

Например, вы можете легко отсоединить обработчик от указанного события:

~~~js
scheduler.attachEvent("onClick", function(){
    console.log("event click");
}, {id: "my-click"}); /*!*/
... //после некоторого времени:
scheduler.detachEvent("my-click");
~~~

2\. **once** - (*boolean*) определяет, будет ли событие выполняться только один раз

Установите значение *true*, если вы хотите зафиксировать первое срабатывание события, как в примере:

~~~js
scheduler.attachEvent("onClick", function(){
    console.log("capture next event click");
    return true;
}, {once: true}); /*!*/
~~~

### Related API
- [detachEvent](api/method/detachevent.md)