---
sidebar_label: "week_scale_date"
title: "week_scale_date template"
description: "定义视图子标题中显示的日期"
---

# week_scale_date

### Description

@short: 定义视图子标题中显示的日期

@signature: week_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` text` - (string) - 用于在scheduler中渲染的html文本

### Example

~~~jsx
var format = scheduler.date.date_to_str(scheduler.config.day_date);
scheduler.templates.week_scale_date = function(date){
    return format(date);
};
~~~

**Applicable views:** [Week view](views/week.md)

### Related Guides
- [주간 뷰 템플릿](views/week-view-templates.md)
