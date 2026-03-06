---
sidebar_label: "onEventAdded"
title: "onEventAdded event"
description: "срабатывает при добавлении нового события в scheduler"
---

# onEventAdded

### Description

@short: Срабатывает при добавлении нового события в scheduler

@signature: onEventAdded: (id: string, ev: object) =\> void;

### Parameters

- `id` - (required) *string* - уникальный идентификатор события
- `ev` - (required) *object* - сам объект события

### Example

~~~jsx
scheduler.attachEvent("onEventAdded", function(id,ev){
    // здесь можно разместить кастомную логику
});
~~~

### Related samples
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)
