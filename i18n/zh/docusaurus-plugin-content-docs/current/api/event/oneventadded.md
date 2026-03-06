---
sidebar_label: "onEventAdded"
title: "onEventAdded event"
description: "当调度器中添加新事件时触发"
---

# onEventAdded

### Description

@short: 当调度器中添加新事件时触发

@signature: onEventAdded: (id: string, ev: object) =\> void;

### Parameters

- `id` - (required) *string* - 事件的唯一标识符
- `ev` - (required) *object* - 事件对象本身

### Example

~~~jsx
scheduler.attachEvent("onEventAdded", function(id,ev){
    // 可以在这里放置自定义逻辑
});
~~~

### Related samples
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)
