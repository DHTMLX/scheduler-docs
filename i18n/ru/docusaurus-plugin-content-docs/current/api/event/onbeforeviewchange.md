---
sidebar_label: "onBeforeViewChange"
title: "onBeforeViewChange event"
description: "срабатывает непосредственно перед переключением пользователя с текущего вида на другой"
---

# onBeforeViewChange

### Description

@short: Срабатывает непосредственно перед переключением пользователя с текущего вида на другой

@signature: onBeforeViewChange: (old_mode: string, old_date: object, mode: string, date: object) =\> boolean

### Parameters

- `old_mode` - (required) *string* - текущий активный вид
- `old_date` - (required) *object* - дата, находящаяся в фокусе в данный момент
- `mode` - (required) *string* - вид, который собирается активироваться
- `date` - (required) *object* - новая выбранная дата

### Returns
- ` result` - (boolean) - определяет, следует ли выполнять стандартное действие события (<b>true</b>) или остановить его (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeViewChange", function(old_mode,old_date,mode,date){
    //здесь можно разместить кастомную логику
    return true;
});
~~~

### Related samples
- [Configuring the Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

- Это событие можно заблокировать, вернув *false*, что не позволит переключиться с текущего вида.
- Оно также срабатывает при первой загрузке scheduler на странице; в этом случае **old_mode** и **old_date** будут неопределены.
