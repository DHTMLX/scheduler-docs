---
sidebar_label: "onEventDeleted"
title: "onEventDeleted event"
description: "在事件被删除后立即触发（自版本 3.0+ 起可用）"
---

# onEventDeleted

### Description

@short: 在事件被删除后立即触发（自版本 3.0+ 起可用）

@signature: onEventDeleted: (id: string, ev: object) =\> void;

### Parameters

- `id` - (required) *string* - 事件的 id
- `ev` - (required) *object* - 事件对象

### Example

~~~jsx
scheduler.attachEvent("onEventDeleted", function(id,ev){
    // 自定义代码
});
~~~

### Related samples
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

无论是否使用 DataProcessor 库，此事件都会触发。
