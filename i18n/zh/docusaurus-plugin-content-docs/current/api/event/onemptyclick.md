---
sidebar_label: "onEmptyClick"
title: "onEmptyClick event"
description: "当用户点击调度器中空白区域（非事件部分）时触发"
---

# onEmptyClick

### Description

@short: 当用户点击调度器中空白区域（非事件部分）时触发

@signature: onEmptyClick: (date: object, e: Event) =\> void;

### Parameters

- `date` - (required) *object* - 对应用户点击位置的日期
- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
scheduler.attachEvent("onEmptyClick", function (date, e){
       //这里编写自定义逻辑
});
~~~

### Related samples
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)
