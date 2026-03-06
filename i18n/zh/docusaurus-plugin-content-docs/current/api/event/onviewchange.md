---
sidebar_label: "onViewChange"
title: "onViewChange event"
description: "在当前视图切换到另一个视图后触发"
---

# onViewChange

### Description

@short: 在当前视图切换到另一个视图后触发

@signature: onViewChange: (new_mode: string, new_date: object) =\> void

### Parameters

- `new_mode` - (required) *string* - 更新后的视图
- `new_date` - (required) *object* - 更新后的日期

### Example

~~~jsx
scheduler.attachEvent("onViewChange", function (new_mode , new_date){
    //在这里编写任何自定义逻辑
});
~~~

### Details

每当当前视图更新时，此事件会被触发。
