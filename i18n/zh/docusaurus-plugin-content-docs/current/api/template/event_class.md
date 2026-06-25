---
sidebar_label: event_class
title: "event_class 模板"
description: "指定将应用于事件容器的 CSS 类"
---

# event_class

### Description

@short: 将应用于事件容器的 CSS 类

@signature: event_class: (start: Date, end: Date, ev: any) =\> string

### Parameters

- `start` - (required) *Date* - 事件计划开始的日期
- `end` - (required) *Date* - 事件计划结束的日期
- `ev` - (required) *object* - 事件对象

### Returns
- `css_class` - (string) - 相关元素的 CSS 类

### Example

~~~jsx
scheduler.templates.event_class = (start, end, ev) => {
    return "";
};
~~~

**Applicable views:** [日视图](views/day.md), [月视图](views/month.md), [周视图](views/week.md), [年视图](views/year.md), [Units 视图](views/units.md), [时间线视图](views/timeline.md)

### Related samples
- [为事件着色](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [使用模板美化事件](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)

### Details

在时间线视图中，模板仅应用于 'Bar' 和 'Tree' 模式。

有关自定义事件颜色的完整信息，请参阅相关文档 [自定义事件颜色](guides/custom-events-color.md)。

### Related Guides
- [自定义事件颜色](guides/custom-events-color.md)
- [日视图模板](views/day-view-templates.md)
- [月视图模板](views/month-view-templates.md)