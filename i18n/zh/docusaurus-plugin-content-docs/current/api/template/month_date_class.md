---
sidebar_label: "month_date_class"
title: "month_date_class template"
description: "定义分配给日期单元格的CSS类"
---

# month_date_class

### Description

@short: 定义分配给日期单元格的CSS类

@signature: month_date_class: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` css_class` - (string) - 对应元素的CSS类

### Example

~~~jsx
scheduler.templates.month_date_class = function(date){
    return "";
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related Guides
- [Month View Templates](views/month-view-templates.md)
