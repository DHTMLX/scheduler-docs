---
sidebar_label: "day_date"
title: "day_date template"
description: "定义在 Day 和 Units 视图的标题中显示的日期"
---

# day_date

### Description

@short: 定义在 Day 和 Units 视图的标题中显示的日期

@signature: day_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` text` - (string) - 要在 scheduler 中显示的 html 文本

### Example

~~~jsx
scheduler.templates.day_date = function(date){
    const formatFunc = scheduler.date.date_to_str(scheduler.config.default_date);
    return formatFunc(date);
};
~~~

**Applicable views:** [Day view](views/day.md), [Units view](views/units.md)

### Related Guides
- [Day View Templates](views/day-view-templates.md)
