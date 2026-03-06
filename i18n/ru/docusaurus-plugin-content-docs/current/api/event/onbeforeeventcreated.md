---
sidebar_label: "onBeforeEventCreated"
title: "onBeforeEventCreated event"
description: "срабатывает, когда пользователь создает новое событие, перетаскивая курсор по scheduler"
---

# onBeforeEventCreated

### Description

@short: Срабатывает, когда пользователь создает новое событие, перетаскивая курсор по scheduler

@signature: onBeforeEventCreated: (e: Event) =\> boolean

### Parameters

- `e` - (required) *Event* - нативный объект события

### Returns
- ` result` - (boolean) - указывает, будет ли выполнено действие по умолчанию для события (<b>true</b>) или оно будет отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventCreated", function (e){
    //здесь можно добавить пользовательскую логику
    return true;
});
~~~

### Details

Учтите, что это событие срабатывает только если включена опция конфигурации [drag_create](api/config/drag_create.md).
