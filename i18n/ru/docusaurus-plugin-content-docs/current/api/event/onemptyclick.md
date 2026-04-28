---
sidebar_label: onEmptyClick
title: "onEmptyClick event"
description: "Срабатывает, когда пользователь кликает по пустому месту в расписании (не по событиям)"
---

# onEmptyClick

### Description

@short: Срабатывает, когда пользователь кликает по пустому месту в расписании (не по событиям)

@signature: onEmptyClick: (date: object, e: Event) =\> void;

### Parameters

- `date` - (required) *object* - дата, которая соответствует точке, по которой пользователь кликает
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
scheduler.attachEvent("onEmptyClick", function (date, e){
    // любая ваша логика здесь
});
~~~

### Related samples
- [Обработка подсветки указателя](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)