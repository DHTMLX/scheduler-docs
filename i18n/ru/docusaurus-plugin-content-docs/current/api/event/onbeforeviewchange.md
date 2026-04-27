---
sidebar_label: onBeforeViewChange
title: "onBeforeViewChange событие"
description: "срабатывает до того, как пользователь изменит текущий просмотр на другой"
---

# onBeforeViewChange

### Description

@short: Срабатывает до того, как пользователь изменит текущий просмотр на другой

@signature: onBeforeViewChange: (old_mode: string, old_date: object, mode: string, date: object) =\> boolean

### Parameters

- `old_mode` - (обязательно) *string* - текущий активный просмотр
- `old_date` - (обязательно) *object* - текущая активная дата
- `mode` - (обязательно) *string* - новый просмотр
- `date` - (обязательно) *object* - новая дата

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (true) или отменено (false)

### Example

~~~jsx
scheduler.attachEvent("onBeforeViewChange", function(old_mode,old_date,mode,date){
    // любая ваша логика здесь
    return true;
});
~~~

### Related samples
- [Configuring the Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

- Событие можно блокировать. Возвращайте *false*, и scheduler оставит текущий просмотр открытым.
- Это событие также срабатывает, когда планировщик впервые отрисовывается на странице. В этом случае параметры **old_mode** и **old_date** не определены.