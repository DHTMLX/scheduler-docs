---
sidebar_label: onEventCollision
title: "onEventCollision event"
description: "срабатывает, когда пользователь пытается создать новое событие (или изменить существующее) внутри уже занятого временного слота"
---

# onEventCollision

### Description

@short: Срабатывает, когда пользователь пытается создать новое событие (или изменить существующее) внутри уже занятого временного слота

@signature: onEventCollision: (ev: object, evs: array) =\> boolean;

### Parameters

- `ev` - (required) *object* - объект события
- `evs` - (required) *array* - коллекция объектов событий, которые уже занимают один и тот же слот времени

### Returns
- ` result` - (boolean) - определяет, будет ли выполнение действия по умолчанию события выполнено (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onEventCollision", function (ev, evs){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

:::note
 Чтобы событие работало, необходимо активировать плагин [collision](guides/extensions-list.md#collision). 
:::

Возвращение <i>true</i> из функции обработчика блокирует добавление/изменение события. Возвращение <i>false</i> — допускает столкновение, т.е. добавление/изменение событий.