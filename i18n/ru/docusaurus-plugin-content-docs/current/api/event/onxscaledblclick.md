---
sidebar_label: "onXScaleDblClick"
title: "onXScaleDblClick event"
description: "срабатывает, когда пользователь двойным кликом нажимает на ячейку по оси X (применимо только в режиме Timeline)"
---

# onXScaleDblClick

### Description

@short: Срабатывает, когда пользователь двойным кликом нажимает на ячейку по оси X (применимо только в режиме Timeline)

@signature: onXScaleDblClick: (index: number, value: object, e: Event) =\> void

### Parameters

- `index` - (required) *number* - индекс нажатой колонки, начиная с нуля
- `value` - (required) *object* - объект Date, представляющий начальную временную метку нажатой ячейки
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
scheduler.attachEvent("onXScaleDblClick", function (index, value, e){
    //любая ваша логика здесь
});
~~~
