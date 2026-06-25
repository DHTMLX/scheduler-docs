---
sidebar_label: onYScaleDblClick
title: "onYScaleDblClick event"
description: "срабатывает при двойном клике по ячейке на оси Y (только в представлении таймлайн)"
---

# onYScaleDblClick

### Description

@short: Срабатывает при двойном клике по ячейке на оси Y (только в представлении таймлайн)

@signature: onYScaleDblClick: (index: number, section: object, e: Event) =\> void

### Parameters

- `index` - (required) *number* - индекс строки нажатой ячейки (нумерация с нуля)
- `section` - (required) *object* - объект данных нажатой ячейки
- `e` - (required) *Event* - объект нативного события

### Example

~~~jsx
scheduler.attachEvent("onYScaleDblClick", function (index, section, e){
    // любая ваша логика здесь
});
~~~