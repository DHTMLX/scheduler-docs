---
sidebar_label: "week_date_class"
title: "week_date_class template"
description: "定义分配给某一天单元格的CSS类"
---

# week_date_class

### Description

@short: 定义分配给某一天单元格的CSS类

@signature: week_date_class: (start: Date, today: Date) =\> string

### Parameters

- `start` - (required) *Date* - 列的起始日期
- `today` - (required) *Date* - 当前日期

### Returns
- ` css_class` - (string) - 对应元素的css类

### Example

~~~jsx
scheduler.templates.week_date_class = function(start, today){
    return "";
};
~~~

**Applicable views:** [Week view](views/week.md), [Units view](views/units.md)

### Related Guides
- [주간 뷰 템플릿](views/week-view-templates.md)
