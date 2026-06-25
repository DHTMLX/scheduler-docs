---
sidebar_label: event_text
title: "event_text 模板"
description: "指定事件的文本"
---

# event_text

### Description

@short: 指定事件的文本

@signature: event_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (必填) *Date* - 事件计划开始的日期
- `end` - (必填) *Date* - 事件计划结束的日期
- `event` - (必填) *object* - 事件对象

### Returns
- `text` - (string) - 用于在 Scheduler 中呈现的 HTML 文本

### Example

~~~jsx
scheduler.templates.event_text = (start, end, event) => {
    return `<a href='http://some.com/details.php?for=${event.id}'>${event.text}</a>`;
};
~~~

**适用视图：** [日视图](views/day.md), [周视图](views/week.md), [单元视图](views/units.md)

### Related samples
- [使用模板自定义事件样式](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)

### Details

注意：对于 Month 和 Timeline 视图，您需要使用 [`event_bar_text`](api/template/event_bar_text.md) 模板来指定事件的文本。

### Related Guides
- [日视图模板](views/day-view-templates.md)