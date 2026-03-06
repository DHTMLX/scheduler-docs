---
sidebar_label: "tooltip_text"
title: "tooltip_text template"
description: "设置在tooltip中显示的文本"
---

# tooltip_text

### Description

@short: 设置在tooltip中显示的文本

@signature: tooltip_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 事件开始的日期
- `end` - (required) *Date* - 事件结束的日期
- `event` - (required) *object* - 事件对象本身

### Returns
- ` text` - (string) - 显示在scheduler tooltip中的html内容

### Example

~~~jsx
scheduler.templates.tooltip_text = function(start,end,ev){
    return "<b>Event:</b> "+ev.text+"<br/><b>Start date:</b> " + 
    scheduler.templates.tooltip_date_format(start)+ 
    "<br/><b>End date:</b> "+scheduler.templates.tooltip_date_format(end);
};
~~~

**Applicable views:** [Agenda view](views/agenda.md), [Day view](views/day.md), [Map view](views/map.md), [Month view](views/month.md), [Week view](views/week.md), [Week Agenda view](views/weekagenda.md), [Units view](views/units.md)

### Details

:::note
 该模板仅在启用[tooltip](guides/extensions-list.md#tooltip) 插件时生效。 
:::

### Related API
- [tooltip_date_format](api/template/tooltip_date_format.md)

### Related Guides
- [공통 템플릿](guides/common-templates.md#tooltips)
