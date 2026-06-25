---
sidebar_label: "month_date"
title: "month_date template"
description: "设置视图头部显示的日期"
---

# month_date

### Description

@short: 设置视图头部显示的日期

@signature: month_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 需要格式化显示的日期

### Returns
- ` text` - (string) - 在scheduler中显示的html文本

### Example

~~~jsx
scheduler.templates.month_date = function(date){
    const dateToStr_func = scheduler.date.date_to_str(scheduler.config.month_date);
    return  dateToStr_func(date);
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related Guides
- [Month View Templates](views/month-view-templates.md)
