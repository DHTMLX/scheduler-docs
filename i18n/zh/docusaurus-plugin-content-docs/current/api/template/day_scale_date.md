---
sidebar_label: "day_scale_date"
title: "day_scale_date template"
description: "设置日视图子标题中显示的日期"
---

# day_scale_date

### Description

@short: 设置日视图子标题中显示的日期

@signature: day_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` text` - (string) - 用于在scheduler中渲染的html文本

### Example

~~~jsx
const formatDayScale = scheduler.date.date_to_str("%j %M %Y");

scheduler.templates.day_scale_date = function(date){
    return formatDayScale(date);
};
~~~

**Applicable views:** [Day view](views/day.md)

### Related Guides
- [Day View Templates](views/day-view-templates.md)
