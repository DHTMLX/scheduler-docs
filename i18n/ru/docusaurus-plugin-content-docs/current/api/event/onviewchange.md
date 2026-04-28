---
sidebar_label: onViewChange
title: "onViewChange событие"
description: "Срабатывает после переключения текущего вида на другой"
---

# onViewChange

### Description

@short: Срабатывает после того, как текущий вид изменится на другой

@signature: onViewChange: (new_mode: string, new_date: Date) =\> void

### Parameters

- `new_mode` - (required) *string* - новый вид
- `new_date` - (required) *Date* - новая дата

### Example

~~~jsx
scheduler.attachEvent("onViewChange", (new_mode, new_date) => {
    // любая пользовательская логика здесь
});
~~~

### Details

Событие вызывается каждый раз, когда текущий вид изменяется.