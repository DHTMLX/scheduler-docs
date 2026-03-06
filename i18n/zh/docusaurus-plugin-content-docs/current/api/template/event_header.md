---
sidebar_label: "event_header"
title: "event_header template"
description: "定义事件的头部内容"
---

# event_header

### Description

@short: 定义事件的头部内容

@signature: event_header: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 事件开始的日期   
- `end` - (required) *Date* - 事件结束的日期
- `event` - (required) *object* - 事件的数据对象

### Returns
- ` text` - (string) - 用于scheduler中渲染的html文本

### Example

~~~jsx
scheduler.templates.event_header = function(start,end,ev){
    return scheduler.templates.event_date(start)+" - "+
    scheduler.templates.event_date(end);
};
~~~

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related Guides
- [Day View Templates](views/day-view-templates.md)
- [주간 뷰 템플릿](views/week-view-templates.md)
