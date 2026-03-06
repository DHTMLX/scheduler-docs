---
sidebar_label: "onLimitViolation"
title: "onLimitViolation event"
description: "срабатывает, когда пользователь пытается назначить время событию, которое в данный момент ограничено или заблокировано"
---

# onLimitViolation

### Description

@short: Срабатывает, когда пользователь пытается назначить время событию, которое в данный момент ограничено или заблокировано

@signature: onLimitViolation: (id: string, obj: object) =\> void;

### Parameters

- `id` - (required) *string* - идентификатор события
- `obj` - (required) *object* - объект события

### Example

~~~jsx
scheduler.attachEvent("onLimitViolation", function  (id, obj){
    //любая ваша логика здесь
});
~~~

### Details

Это событие срабатывает каждый раз, когда пользователь пытается установить время события на период, который ограничен или заблокирован. Эти ограничения могут быть настроены через:

- опции [limit_start](api/config/limit_start.md) и [limit_end](api/config/limit_end.md)
- метод [addMarkedTimespan](api/method/addmarkedtimespan.md)

:::note

Возврат 'true' из обработчика этого события позволяет событию обойти ограничение и быть назначенным на запрещённое время.
 
:::
