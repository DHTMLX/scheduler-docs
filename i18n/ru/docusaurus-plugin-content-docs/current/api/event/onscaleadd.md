---
sidebar_label: onScaleAdd
title: "onScaleAdd event"
description: "Срабатывает после отрисовки одного блока вида (колонки, секции, дневной ячейки и т.д.) в планировщике"
---

# onScaleAdd

### Description

@short: Срабатывает после отрисовки одного блока вида (колонки, секции, дневной ячейки и т.д.) в планировщике

@signature: onScaleAdd: (unit: HTMLElement, date: object) =\> void

### Parameters

- `unit` - (обязателен) *HTMLElement* - HTML-объект связанного блока вида
- `date` - (обязателен) *object* - дата блока/единицы

### Example

~~~jsx
scheduler.attachEvent("onScaleAdd", function (unit, date){
    // любая ваша логика здесь
});
~~~

### Details

Доступные виды имеют разные единицы отображения:

- **Day view** - колонка с днем (весь вид);
- **Week view** - колонка с днем;
- **Month view** - ячейка с днем;
- **Units** - секция;
- **Timeline** - секция;
- **Year** - ячейка с днем.