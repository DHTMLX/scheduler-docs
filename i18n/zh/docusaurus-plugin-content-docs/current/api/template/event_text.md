---
sidebar_label: "event_text"
title: "event_text template"
description: "定义事件显示的文本"
---

# event_text

### Description

@short: 定义事件显示的文本

@signature: event_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 事件的开始日期   
- `end` - (required) *Date* - 事件的结束日期
- `event` - (required) *object* - 事件数据对象

### Returns
- ` text` - (string) - 用于在scheduler中显示事件的html内容

### Example

~~~jsx
scheduler.templates.event_text=function(start, end, event){
    return "<a href='http://some.com/details.php?for="+event.id+"'>"
    +event.text+"</a>";
}
~~~

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)

### Details

请注意，对于Month和Timeline视图，应使用[event_bar_text](api/template/event_bar_text.md)模板来设置事件的文本。

### Related Guides
- [Day View Templates](views/day-view-templates.md)
