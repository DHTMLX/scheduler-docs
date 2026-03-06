---
sidebar_label: "event_bar_date"
title: "event_bar_date template"
description: "用于设置事件的日期。此功能仅适用于持续一天的事件。"
---

# event_bar_date

### Description

@short: 用于设置事件的日期。此功能仅适用于持续一天的事件。

@signature: event_bar_date: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 事件开始的日期  
- `end` - (required) *Date* - 事件结束的日期
- `event` - (required) *object* - 事件对象本身

### Returns
- ` text` - (string) - 在scheduler中显示的html内容

### Example

~~~jsx
scheduler.templates.event_bar_date = function(start,end,ev){
     return "• <b>"+scheduler.templates.event_date(start)+"</b> ";
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related Guides
- [Month View Templates](views/month-view-templates.md)
