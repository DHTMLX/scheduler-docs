---
sidebar_label: "onXScaleClick"
title: "onXScaleClick event"
description: "срабатывает при одиночном клике пользователя по ячейке на оси x (применимо только в режиме Timeline)"
---

# onXScaleClick

### Description

@short: Срабатывает при одиночном клике пользователя по ячейке на оси x (применимо только в режиме Timeline)

@signature: onXScaleClick: (index: number, value: object, e: Event) =\> void

### Parameters

- `index` - (required) *number* - нулевой индекс кликнутого столбца
- `value` - (required) *object* - объект Date, представляющий начальную временную метку кликнутой ячейки
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
scheduler.attachEvent("onXScaleClick", function (index, value,e){
    //любая пользовательская логика здесь
});
~~~
