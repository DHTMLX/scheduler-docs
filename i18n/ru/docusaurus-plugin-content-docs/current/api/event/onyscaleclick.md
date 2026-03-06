---
sidebar_label: "onYScaleClick"
title: "onYScaleClick event"
description: "срабатывает при одиночном клике пользователя на ячейку по оси Y (применимо только в режиме Timeline)"
---

# onYScaleClick

### Description

@short: Срабатывает при одиночном клике пользователя на ячейку по оси Y (применимо только в режиме Timeline)

@signature: onYScaleClick: (index: number, section: object, e: Event) =\> void

### Parameters

- `index` - (required) *number* - нулевой индекс выбранной строки
- `section` - (required) *object* - объект данных, соответствующий кликнутой ячейке
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
scheduler.attachEvent("onYScaleClick", function (index, section, e){
    //любая ваша логика здесь
});
~~~
