---
sidebar_label: "year_date"
title: "year_date template"
description: "设置视图头部显示的日期"
---

# year_date

### Description

@short: 设置视图头部显示的日期

@signature: year_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` text` - (string) - 用于在 scheduler 中渲染的 html 文本

### Example

~~~jsx
var date_to_str=scheduler.date.date_to_str(scheduler.locale.labels.year_tab +" %Y");

scheduler.templates.year_date = function(date){
    return date_to_str(date);
};
~~~

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 此模板需要启用 [year_view](guides/extensions-list.md#year) 插件。 
:::

### Related Guides
- [Year View Templates](views/year-view-templates.md)
