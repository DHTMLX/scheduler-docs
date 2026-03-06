---
sidebar_label: "onYScaleDblClick"
title: "onYScaleDblClick event"
description: "вызывается, когда пользователь двойным щелчком кликает по ячейке на оси Y (применимо только в представлении Timeline)"
---

# onYScaleDblClick

### Description

@short: Вызывается, когда пользователь двойным щелчком кликает по ячейке на оси Y (применимо только в представлении Timeline)

@signature: onYScaleDblClick: (index: number, section: object, e: Event) =\> void

### Parameters

- `index` - (required) *number* - нулевой индекс строки, по которой был выполнен клик
- `section` - (required) *object* - объект данных, связанный с кликнутой ячейкой
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
scheduler.attachEvent("onYScaleDblClick", function (index, section, e){
    // здесь можно добавить пользовательскую логику
});
~~~
