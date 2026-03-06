---
sidebar_label: "onEventDeleted"
title: "onEventDeleted event"
description: "срабатывает сразу после удаления события (доступно с версии 3.0+)"
---

# onEventDeleted

### Description

@short: Срабатывает сразу после удаления события (доступно с версии 3.0+)

@signature: onEventDeleted: (id: string, ev: object) =\> void;

### Parameters

- `id` - (required) *string* - id события
- `ev` - (required) *object* - объект события

### Example

~~~jsx
scheduler.attachEvent("onEventDeleted", function(id,ev){
    // custom code
});
~~~

### Related samples
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

Это событие срабатывает независимо от того, используется ли библиотека DataProcessor.
