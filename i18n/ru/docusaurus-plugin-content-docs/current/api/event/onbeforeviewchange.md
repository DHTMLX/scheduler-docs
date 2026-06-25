---
sidebar_label: onBeforeViewChange
title: "Событие onBeforeViewChange"
description: "срабатывает перед тем, как пользователь изменит текущий просмотр на другой"
---

# onBeforeViewChange

### Description

@short: Срабатывает перед тем, как пользователь изменит текущий просмотр на другой

@signature: onBeforeViewChange: (old_mode: string, old_date: Date, mode: string, date: Date) =\> boolean

### Parameters

- `old_mode` - (required) *string* - текущий активный вид
- `old_date` - (required) *Date* - текущая активная дата
- `mode` - (required) *string* - новый вид
- `date` - (required) *Date* - новая дата

### Returns
- `result` - (boolean) - определяет, будет ли выполнено действие по умолчанию у события (true) или отменено (false)

### Example

~~~jsx
scheduler.attachEvent("onBeforeViewChange", (old_mode, old_date, mode, date) => {
    // здесь можно добавить кастомную логику
    return true;
});
~~~

### Related samples
- [Настройка вида Map](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

- Событие можно блокировать. Верните `false`, и Scheduler оставит текущий вид открытым.
- Событие также срабатывает при первоначальном рендеринге Scheduler на странице. В этом случае параметры `old_mode` и `old_date` равны undefined.