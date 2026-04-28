---
sidebar_label: onCellClick
title: "onCellClick событие"
description: "срабатывает при одиночном клике по ячейке (только в представлении Timeline)"
---

# onCellClick

### Description

@short: Срабатывает при одиночном клике по ячейке (только в представлении Timeline)

@signature: onCellClick: (x_ind: number, y_ind: number, x_val: object, y_val: array, e: Event) =\> void;

### Parameters

- `x_ind` - (required) *number* - индекс столбца нажатой ячейки (нумерация с нуля)
- `y_ind` - (required) *number* - индекс строки нажатой ячейки (нумерация с нуля)
- `x_val` - (required) *object* - Date объект времени начала нажатой ячейки
- `y_val` - (required) *array* - массив объектов данных, находящихся в нажатой ячейке
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
scheduler.attachEvent("onCellClick", function (x_ind, y_ind, x_val, y_val, e){
    // любая ваша логика здесь
});
~~~

### Details

:::note

Событие срабатывает только в представлении Timeline
 
:::