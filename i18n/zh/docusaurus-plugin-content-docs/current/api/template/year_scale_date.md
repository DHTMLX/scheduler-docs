---
sidebar_label: "year_scale_date"
title: "year_scale_date template"
description: "定义在视图的月份块子标题中显示的日期名称"
---

# year_scale_date

### Description

@short: 定义在视图的月份块子标题中显示的日期名称

@signature: year_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 要格式化的日期

### Returns
- ` text` - (string) - 在scheduler中显示的html内容

### Example

~~~jsx
const formatScaleDate = scheduler.date.date_to_str("%D");
scheduler.templates.year_scale_date = function(date){
    return formatScaleDate(date);
};
~~~

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 该模板需要启用[year_view](guides/extensions-list.md#year)插件。 
:::

### Related Guides
- [Year View Templates](views/year-view-templates.md)
