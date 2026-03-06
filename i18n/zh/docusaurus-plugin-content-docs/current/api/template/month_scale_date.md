---
sidebar_label: "month_scale_date"
title: "month_scale_date template"
description: "定义在月视图中X轴使用的日期格式"
---

# month_scale_date

### Description

@short: 定义在月视图中X轴使用的日期格式

@signature: month_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` text` - (string) - 要在scheduler中显示的html文本

### Example

~~~jsx
const formatMonthScale = scheduler.date.date_to_str("%l");

scheduler.templates.month_scale_date = function(date){
    return formatMonthScale(date);
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related Guides
- [Month View Templates](views/month-view-templates.md)
