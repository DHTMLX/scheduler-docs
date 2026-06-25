---
sidebar_label: onEventDeleted
title: "onEventDeleted событие"
description: "срабатывает после удаления указанного события (версия 3.0+)"
---

# onEventDeleted

### Description

@short: Срабатывает после удаления указанного события (версия 3.0+)

@signature: onEventDeleted: (id: string, ev: object) =\> void;

### Parameters

- `id` - (required) *string* - идентификатор события
- `ev` - (required) *object* - объект события

### Example

~~~jsx
scheduler.attachEvent("onEventDeleted", function(id,ev){
    // любая ваша логика здесь
});
~~~

### Related samples
- [Выделенные временные интервалы в Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

Событие будет срабатывать независимо от того, используется ли библиотека DataProcessor или нет.