---
sidebar_label: "event_bar_text"
title: "event_bar_text template"
description: "设置多天事件上显示的文本。"
---

# event_bar_text

### Description

@short: 设置多天事件上显示的文本。

@signature: event_bar_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 事件开始的日期  
- `end` - (required) *Date* - 事件结束的日期
- `event` - (required) *object* - 事件对象

### Returns
- ` text` - (string) - 用于在scheduler中显示的HTML内容

### Example

~~~jsx
scheduler.templates.event_bar_text = function(start,end,event){
      return event.text;
};
~~~

**Applicable views:** [Month view](views/month.md), [Timeline view](views/timeline.md)

### Related Guides
- [Month View Templates](views/month-view-templates.md)
- [타임라인 뷰 템플릿](views/timeline-view-templates.md)
