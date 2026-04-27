---
sidebar_label: onDblClick
title: "onDblClick event"
description: "срабатывает, когда пользователь дважды кликает по событию"
---

# onDblClick

### Description

@short: Срабатывает, когда пользователь дважды кликает по событию

@signature: onDblClick: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - идентификатор события
- `e` - (required) *Event* - объект нативного события

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onDblClick", function (id, e){
    // любая ваша логика здесь
    return true;
})
~~~

### Details

Событие можно заблокировать. Возвращайте *false*, чтобы отменить поведение по умолчанию.