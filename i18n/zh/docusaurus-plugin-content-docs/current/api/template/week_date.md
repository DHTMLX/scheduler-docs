---
sidebar_label: "week_date"
title: "week_date template"
description: "设置视图头部显示的日期"
---

# week_date

### Description

@short: 设置视图头部显示的日期

@signature: week_date: (start: Date, end: Date) =\> string

### Parameters

- `start` - (required) *Date* - 视图的起始日期
- `end` - (required) *Date* - 视图的结束日期

### Returns
- ` text` - (string) - 在scheduler中显示的html文本

### Example

~~~jsx
scheduler.templates.week_date = function(start, end){
    return scheduler.templates.day_date(start)+" &ndash; "+
    scheduler.templates.day_date(scheduler.date.add(end,-1,"day"));
};
~~~

**Applicable views:** [Week view](views/week.md), [Week Agenda view](views/weekagenda.md)

### Related Guides
- [주간 뷰 템플릿](views/week-view-templates.md)
- [WeekAgenda 뷰 템플릿](views/weekagenda-view-templates.md)
