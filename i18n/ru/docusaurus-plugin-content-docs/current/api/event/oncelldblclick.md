---
sidebar_label: "onCellDblClick"
title: "onCellDblClick event"
description: "срабатывает при двойном клике пользователя по ячейке (только в Timeline view)"
---

# onCellDblClick

### Description

@short: Срабатывает при двойном клике пользователя по ячейке (только в Timeline view)

@signature: onCellDblClick: (x_ind: number, y_ind: number, x_val: object, y_val: array, e: Event) =\> void;

### Parameters

- `x_ind` - (required) *number* - ноль-индексированный номер столбца, по которому был произведён клик
- `y_ind` - (required) *number* - ноль-индексированный номер строки, по которой был произведён клик
- `x_val` - (required) *object* - объект Date, представляющий стартовую временную метку ячейки, по которой кликнули
- `y_val` - (required) *array* - массив, содержащий объекты данных, расположенных в ячейке, по которой кликнули
- `e` - (required) *Event* - родной объект события

### Example

~~~jsx
scheduler.attachEvent("onCellDblClick", function (x_ind, y_ind, x_val, y_val, e){
    // здесь можно разместить кастомную логику
});
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note

Это событие срабатывает только в Timeline view
 
:::
