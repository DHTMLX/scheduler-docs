---
sidebar_label: "agenda_date"
title: "agenda_date template"
description: "定义视图头部显示的日期"
---

# agenda_date

### Description

@short: 定义视图头部显示的日期

@signature: agenda_date: (start: Date, end: Date) =\> string

### Parameters

- `start` - (required) *Date* - 视图的开始日期
- `end` - (required) *Date* - 视图的结束日期

### Returns
- ` text` - (string) - 将显示的HTML内容

### Example

~~~jsx
//默认定义
scheduler.templates.agenda_date = function(start, end) {
     return '';
};
~~~

**Applicable views:** [Agenda view](views/agenda.md)

### Details

:::note
 此模板仅在启用 [agenda_view](guides/extensions-list.md#agenda-view) 插件时生效。 
:::

### Related Guides
- [Agenda View Templates](views/agenda-view-templates.md)
