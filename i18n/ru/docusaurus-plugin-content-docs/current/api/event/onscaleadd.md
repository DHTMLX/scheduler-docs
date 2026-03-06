---
sidebar_label: "onScaleAdd"
title: "onScaleAdd event"
description: "срабатывает сразу после того, как единица представления (например, колонка, секция или ячейка дня) отрисовывается в scheduler-е"
---

# onScaleAdd

### Description

@short: Срабатывает сразу после того, как единица представления (например, колонка, секция или ячейка дня) отрисовывается в scheduler-е

@signature: onScaleAdd: (unit: HTMLElement, date: object) =\> void

### Parameters

- `unit` - (required) *HTMLElement* - HTML-элемент, представляющий конкретную единицу представления
- `date` - (required) *object* - дата, связанная с этой единицей

### Example

~~~jsx
scheduler.attachEvent("onScaleAdd", function (unit, date){
    //место для вашей пользовательской логики
});
~~~

### Details

Разные виды отображения содержат различные единицы:

- **Day view** - колонка, представляющая целый день;
- **Week view** - колонка для каждого дня;
- **Month view** - ячейка для каждого дня;
- **Units** - секция;
- **Timeline** - секция;
- **Year** - ячейка, представляющая день.
