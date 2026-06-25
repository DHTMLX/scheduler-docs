---
sidebar_label: onXScaleDblClick
title: "onXScaleDblClick событие"
description: "срабатывает, когда пользователь выполняет двойной клик по ячейке на оси X (только в представлении Timeline)"
---

# onXScaleDblClick

### Description

@short: Срабатывает, когда пользователь выполняет двойной клик по ячейке на оси X (только в представлении Timeline)

@signature: onXScaleDblClick: (index: number, value: object, e: Event) =\> void

### Parameters

- `index` - (required) *number* - индекс столбца нажатой ячейки (нумерация с нуля)
- `value` - (required) *object* - Date-объект начала временной метки нажатой ячейки
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
scheduler.attachEvent("onXScaleDblClick", function (index, value, e){
    // любая ваша логика здесь
});
~~~