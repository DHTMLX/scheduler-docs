---
sidebar_label: attachEvent
title: "метод attachEvent"
description: "прикрепляет обработчик к внутреннему событию dhtmlxScheduler"
---

# attachEvent

### Description

@short: Прикрепляет обработчик к внутреннему событию dhtmlxScheduler

@signature: attachEvent: (name: SchedulerEventName, handler: SchedulerCallback, settings?: any) => string

### Parameters

- `name` - (required) *SchedulerEventName* - имя события, регистр не учитывается
- `handler` - (required) *function* - функция-обработчик
- `settings` - (optional) *object* - необязательный объект с настройками для обработчика события

### Returns
- `event` - (string) - идентификатор подключенного обработчика события

### Example

~~~jsx
scheduler.attachEvent("onEventSave", (id, ev) => {
    if (!ev.text) {
        alert("Текст не должен быть пустым");
        return false;
    }
    return true;
});
~~~

### Related samples
- [Проверка полей lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)
- [Периодические события](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

### Details

Вы можете привязать несколько обработчиков к одному и тому же событию, и все они будут выполняться.
Если некоторые обработчики возвращают `false`, соответствующая операция будет заблокирована.
Обработчики событий обрабатываются в той же последовательности, в которой они были привязаны.

Все слушатели событий, привязанные с использованием [`event()`](api/method/event.md), будут автоматически отключены при вызове [`destructor()`](api/method/destructor.md).

## Свойства объекта настроек

Объект настроек может содержать два свойства:

1\. `id` - (*string*) идентификатор обработчика события

Например, вы можете легко отключить обработчик от указанного события:

~~~js {3}
scheduler.attachEvent("onClick", () => {
    console.log("event click");
}, { id: "my-click" });
// after a while:
scheduler.detachEvent("my-click");
~~~

2\. `once` - (*boolean*) определяет, будет ли обработчик выполнен только один раз

Установите свойство в *true*, если вы хотите зафиксировать первое срабатывание события, например:

~~~js {4}
scheduler.attachEvent("onClick", () => {
    console.log("capture next event click");
    return true;
}, { once: true });
~~~

### Related API
- [detachEvent](api/method/detachevent.md)