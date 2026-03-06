---
sidebar_label: "year_month"
title: "year_month template"
description: "定义视图中月份块标题中显示的月份名称。"
---

# year_month

### Description

@short: 定义视图中月份块标题中显示的月份名称。

@signature: year_month: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` text` - (string) - 在scheduler中显示的html内容

### Example

~~~jsx
const formatMonth = scheduler.date.date_to_str("%F");
scheduler.templates.year_month = function(date){
    return formatMonth(date);
};
~~~

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 该模板需要启用[year_view](guides/extensions-list.md#year) 插件。 
:::

### Related Guides
- [Year View Templates](views/year-view-templates.md)
