---
sidebar_label: onLimitViolation
title: "onLimitViolation event"
description: "срабатывает, когда пользователь пытается установить для события время, которое в данный момент ограничено/заблокировано"
---

# onLimitViolation

### Description

@short: срабатывает, когда пользователь пытается установить для события время, которое в данный момент ограничено/заблокировано

@signature: onLimitViolation: (id: string, obj: object) =\> void;

### Parameters

- `id` - (обязательно) *string* - идентификатор события
- `obj` - (обязательно) *object* - объект события

### Example

~~~jsx
scheduler.attachEvent("onLimitViolation", function  (id, obj){
    // любая ваша логика здесь
});
~~~

### Details

Примечание: событие вызывается, когда пользователь пытается установить для события время, которое в данный момент ограничено/заблокировано через:

- параметры конфигурации [limit_start](api/config/limit_start.md) и [limit_end](api/config/limit_end.md)
- метод [addMarkedTimespan](api/method/addmarkedtimespan.md)

:::note

Если вернуть 'true' из обработчика, связанное событие не будет заблокировано и может иметь недопустимое время.
 
:::