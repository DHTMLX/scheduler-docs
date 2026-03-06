---
sidebar_label: "hour_scale"
title: "hour_scale template"
description: "定义在Y轴上显示的元素"
---

# hour_scale

### Description

@short: 定义在Y轴上显示的元素

@signature: hour_scale: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` text` - (string) - 用于在scheduler中显示的html文本

### Example

~~~jsx
scheduler.templates.hour_scale = function(date){
    return scheduler.date.date_to_str(scheduler.config.hour_date)(date);
};
~~~

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related Guides
- [Day View Templates](views/day-view-templates.md)
- [주간 뷰 템플릿](views/week-view-templates.md)
