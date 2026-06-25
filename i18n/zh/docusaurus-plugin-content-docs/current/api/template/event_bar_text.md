---
sidebar_label: event_bar_text
title: "event_bar_text 模板"
description: "指定事件文本。仅适用于多日事件"
---

# event_bar_text

### Description

@short: 指定事件文本。仅适用于多日事件

@signature: event_bar_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 事件开始计划的日期
- `end` - (required) *Date* - 事件结束的计划日期
- `event` - (required) *object* - 事件的对象

### Returns
- `text` - (string) - 在 Scheduler 中呈现的 HTML 文本

### Example

~~~jsx
scheduler.templates.event_bar_text = (start, end, event) => {
    return event.text;
};
~~~

**Applicable views:** [月视图模板](views/month-view-templates.md), [时间线视图模板](views/timeline-view-templates.md)

### Related Guides
- [月视图模板](views/month-view-templates.md)
- [时间线视图模板](views/timeline-view-templates.md)