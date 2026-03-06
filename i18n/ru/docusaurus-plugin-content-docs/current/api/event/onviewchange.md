---
sidebar_label: "onViewChange"
title: "onViewChange event"
description: "срабатывает после переключения текущего вида на другой"
---

# onViewChange

### Description

@short: Срабатывает после переключения текущего вида на другой

@signature: onViewChange: (new_mode: string, new_date: object) =\> void

### Parameters

- `new_mode` - (required) *string* - обновленный вид
- `new_date` - (required) *object* - обновленная дата

### Example

~~~jsx
scheduler.attachEvent("onViewChange", function (new_mode , new_date){
    //любая пользовательская логика здесь
});
~~~

### Details

Это событие вызывается всякий раз, когда текущий вид обновляется.
