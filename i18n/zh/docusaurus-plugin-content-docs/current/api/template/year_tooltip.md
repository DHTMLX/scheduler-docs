---
sidebar_label: "year_tooltip"
title: "year_tooltip template"
description: "定义显示在有计划事件的日期单元格上的tooltip"
---

# year_tooltip

### Description

@short: 定义显示在有计划事件的日期单元格上的tooltip

@signature: year_tooltip: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 事件开始的日期
- `end` - (required) *Date* - 事件结束的日期
- `event` - (required) *object* - 事件对象

### Returns
- ` text` - (string) - 在scheduler tooltip中显示的HTML内容

### Example

~~~jsx
scheduler.templates.year_tooltip = function(start,end,ev){
    return ev.text;
};
~~~

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 该模板仅在启用了[year_view](guides/extensions-list.md#year)插件时有效。 
:::

### Related Guides
- [Year View Templates](views/year-view-templates.md)
