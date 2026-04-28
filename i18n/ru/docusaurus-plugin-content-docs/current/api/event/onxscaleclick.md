---
sidebar_label: onXScaleClick
title: "onXScaleClick событие"
description: "срабатывает, когда пользователь делает одиночный клик по ячейке на оси X (только в режиме таймлайн)"
---

# onXScaleClick

### Description

@short: Срабатывает, когда пользователь делает одиночный клик по ячейке на оси X (только в режиме таймлайн)

@signature: onXScaleClick: (index: number, value, e) =\> void

### Parameters

- `index` - (required) *number* - индекс столбца нажатой ячейки (нумерация с нуля)
- `value` - (required) *object* - объект Date, задающий метку времени начала нажатой ячейки
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
scheduler.attachEvent("onXScaleClick", function (index, value,e){
    // любая ваша логика здесь
});
~~~