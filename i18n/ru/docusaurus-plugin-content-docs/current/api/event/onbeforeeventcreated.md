---
sidebar_label: onBeforeEventCreated
title: "onBeforeEventCreated event"
description: "срабатывает, когда пользователь создает новое событие путем перетаскивания курсора над scheduler"
---

# onBeforeEventCreated

### Description

@short: Срабатывает, когда пользователь создает новое событие перетаскиванием курсора над scheduler

@signature: onBeforeEventCreated: (e: Event) => boolean

### Parameters

- `e` - (required) *Event* - нативный Object-событие

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventCreated", function (e){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

Примечание: событие срабатывает только если включена конфигурационная опция [drag_create](api/config/drag_create.md).