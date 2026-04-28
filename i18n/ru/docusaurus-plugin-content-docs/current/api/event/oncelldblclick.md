---
sidebar_label: onCellDblClick
title: "onCellDblClick событие"
description: "срабатывает, когда пользователь выполняет двойной щелчок по ячейке (только в представлении Timeline)"
---

# onCellDblClick

### Description

@short: Срабатывает, когда пользователь выполняет двойной щелчок по ячейке (только в представлении Timeline)

@signature: onCellDblClick: (x_ind: number, y_ind: number, x_val: object, y_val: array, e: Event) => void;

### Parameters

- `x_ind` - (required) *number* - индекс столбца нажатой ячейки (нумерация с нуля)
- `y_ind` - (required) *number* - индекс строки нажатой ячейки (нумерация с нуля)
- `x_val` - (required) *object* - Date-объект начала временной метки нажатой ячейки
- `y_val` - (required) *array* - массив объектов данных, находящихся в нажатой ячейке
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
scheduler.attachEvent("onCellDblClick", function (x_ind, y_ind, x_val, y_val, e){
    // любая ваша логика здесь
});
~~~

**Применимые представления:** [Timeline view](views/timeline.md)

### Details

:::note

Событие срабатывает только в представлении Timeline

:::