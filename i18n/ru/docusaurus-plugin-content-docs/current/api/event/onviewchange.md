---
sidebar_label: onViewChange
title: "onViewChange событие"
description: "срабатывает после того, как текущий вид был изменён на другой"
---

# onViewChange

### Description

@short: Срабатывает после изменения текущего вида на другой

@signature: onViewChange: (new_mode: string, new_date: object) =\> void

### Parameters

- `new_mode` - (обязательный) *string* - новый вид
- `new_date` - (обязательный) *object* - новая дата

### Example

~~~jsx
scheduler.attachEvent("onViewChange", function (new_mode , new_date){
    // любая ваша логика здесь
});
~~~

### Details

Событие вызывается каждый раз, когда текущий вид изменяется.