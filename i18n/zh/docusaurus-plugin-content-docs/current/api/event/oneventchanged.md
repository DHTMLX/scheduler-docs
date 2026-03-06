---
sidebar_label: "onEventChanged"
title: "onEventChanged event"
description: "当用户完成编辑事件并保存更新后触发（在事件栏或详情窗口中点击编辑和保存按钮之后）"
---

# onEventChanged

### Description

@short: 当用户完成编辑事件并保存更新后触发（在事件栏或详情窗口中点击编辑和保存按钮之后）

@signature: onEventChanged: (id: string, ev: object) =\> void;

### Parameters

- `id` - (required) *string* - 事件的id
- `ev` - (required) *object* - 事件对象

### Example

~~~jsx
scheduler.attachEvent("onEventChanged", function(id,ev){
    //这里写任何自定义逻辑
});
~~~

### Related samples
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)
