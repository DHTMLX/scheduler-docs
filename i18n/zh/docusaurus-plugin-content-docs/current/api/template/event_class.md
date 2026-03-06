---
sidebar_label: "event_class"
title: "event_class template"
description: "定义将添加到事件容器的CSS类"
---

# event_class

### Description

@short: 定义将添加到事件容器的CSS类

@signature: event_class: (start: Date, end: Date, ev: any) =\> string

### Parameters

- `start` - (required) *Date* - 事件开始的日期   
- `end` - (required) *Date* - 事件结束的日期
- `ev` - (required) *object* - 事件对象

### Returns
- ` css_class` - (string) - 对应元素的CSS类名

### Example

~~~jsx
scheduler.templates.event_class = function(start,end,ev){
    return "";
};
~~~

**Applicable views:** [Day view](views/day.md), [Month view](views/month.md), [Week view](views/week.md), [Year view](views/year.md), [Units view](views/units.md), [Timeline view](views/timeline.md)

### Related samples
- [Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)

### Details

对于Timeline视图，该模板仅在"Bar"和"Tree"模式下使用。

有关自定义事件颜色的详细指导，请参阅相关文档 [Custom Event's Color](guides/custom-events-color.md)。

### Related Guides
- [Custom Event's Color](guides/custom-events-color.md)
- [Day View Templates](views/day-view-templates.md)
- [Month View Templates](views/month-view-templates.md)
