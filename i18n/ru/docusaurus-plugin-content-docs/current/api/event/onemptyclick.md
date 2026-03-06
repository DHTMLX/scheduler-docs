---
sidebar_label: "onEmptyClick"
title: "onEmptyClick event"
description: "срабатывает, когда пользователь кликает по пустой области внутри scheduler (не по событиям)"
---

# onEmptyClick

### Description

@short: Срабатывает, когда пользователь кликает по пустой области внутри scheduler (не по событиям)

@signature: onEmptyClick: (date: object, e: Event) =\> void;

### Parameters

- `date` - (required) *object* - дата, соответствующая месту, где пользователь кликнул
- `e` - (required) *Event* - объект нативного события

### Example

~~~jsx
scheduler.attachEvent("onEmptyClick", function (date, e){
       //любая ваша логика здесь
});
~~~

### Related samples
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)
