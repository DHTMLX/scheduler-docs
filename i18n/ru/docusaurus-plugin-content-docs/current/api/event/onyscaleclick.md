---
sidebar_label: onYScaleClick
title: "onYScaleClick событие"
description: "срабатывает, когда пользователь делает одиночный клик по ячейке на оси Y (только в представлении Timeline)"
---

# onYScaleClick

### Description

@short: Срабатывает, когда пользователь делает одиночный клик по ячейке на оси Y (только в представлении Timeline)

@signature: onYScaleClick: (index: number, section: object, e: Event) =\> void

### Parameters

- `index` - (обязателен) *number* - индекс строки нажатой ячейки (нумерация с нуля)
- `section` - (обязателен) *object* - объект данных нажатой ячейки
- `e` - (обязателен) *Event* - нативный объект события

### Example

~~~jsx
scheduler.attachEvent("onYScaleClick", function (index, section, e){
    // любая ваша логика здесь
});
~~~