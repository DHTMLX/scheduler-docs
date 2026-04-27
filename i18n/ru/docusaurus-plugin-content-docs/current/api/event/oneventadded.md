---
sidebar_label: onEventAdded
title: "onEventAdded событие"
description: "срабатывает, когда пользователь добавляет новое событие в планировщик"
---

# onEventAdded

### Description

@short: Срабатывает, когда пользователь добавляет новое событие в планировщик

@signature: onEventAdded: (id: string, ev: object) =\> void;

### Parameters

- `id` - (required) *string* - идентификатор события
- `ev` - (required) *object* - объект события

### Example

~~~jsx
scheduler.attachEvent("onEventAdded", function(id,ev){
    // любая ваша логика здесь
});
~~~

### Related samples
- [Выделенные временные диапазоны во месячном виде](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)