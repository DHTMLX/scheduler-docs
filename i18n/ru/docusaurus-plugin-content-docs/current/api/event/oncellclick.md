---
sidebar_label: "onCellClick"
title: "onCellClick event"
description: "срабатывает при однократном клике пользователя по ячейке (применимо только в Timeline view)"
---

# onCellClick

### Description

@short: Срабатывает при однократном клике пользователя по ячейке (применимо только в Timeline view)

@signature: onCellClick: (x_ind: number, y_ind: number, x_val: object, y_val: array, e: Event) =\> void;

### Parameters

- `x_ind` - (required) *number* - индекс колонки кликнутой ячейки (начинается с нуля)
- `y_ind` - (required) *number* - индекс строки кликнутой ячейки (начинается с нуля)
- `x_val` - (required) *object* - объект Date, представляющий время начала кликнутой ячейки
- `y_val` - (required) *array* - массив с объектами данных, расположенных в кликнутой ячейке
- `e` - (required) *Event* - родной объект события

### Example

~~~jsx
scheduler.attachEvent("onCellClick", function (x_ind, y_ind, x_val, y_val, e){
    // здесь можно добавить свою логику
});
~~~

### Details

:::note

Это событие срабатывает только в Timeline view
 
:::
