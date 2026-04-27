---
sidebar_label: "month_day"
title: "month_day template"
description: "定义日期在单元格中的显示方式"
---

# month_day

### Description

@short: 定义日期在单元格中的显示方式

@signature: month_day: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 要格式化的日期

### Returns
- ` text` - (string) - 用于在scheduler中显示的html文本

### Example

~~~jsx
scheduler.templates.month_day = function(date){
    const dateToStr_func = scheduler.date.date_to_str(scheduler.config.month_day);
    return  dateToStr_func(date);
};
~~~

**Applicable views:** [Month view](views/month.md), [Year view](views/year.md)

### Related Guides
- [Month View Templates](views/month-view-templates.md)
- [Year View Templates](views/year-view-templates.md)
