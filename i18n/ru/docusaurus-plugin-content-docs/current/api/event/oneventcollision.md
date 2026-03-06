---
sidebar_label: "onEventCollision"
title: "onEventCollision event"
description: "срабатывает, когда пользователь пытается создать новое событие или изменить существующее в уже занятый временной интервал"
---

# onEventCollision

### Description

@short: Срабатывает, когда пользователь пытается создать новое событие или изменить существующее в уже занятый временной интервал

@signature: onEventCollision: (ev: object, evs: array) =\> boolean;

### Parameters

- `ev` - (required) *object* - объект события
- `evs` - (required) *array* - коллекция объектов событий, которые уже запланированы на тот же временной интервал

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию для события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onEventCollision", function (ev, evs){
    // любая кастомная логика здесь
    return true;
});
~~~

### Details

:::note
 Для работы события требуется активировать плагин [collision](guides/extensions-list.md#collision). 
:::

Возврат <i>true</i> из обработчика предотвращает добавление или редактирование события. Возврат <i>false</i> разрешает коллизию, то есть событие будет добавлено или изменено несмотря на перекрытие.
