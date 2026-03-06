---
sidebar_label: "calendar_month"
title: "calendar_month template"
description: "设置迷你日历头部（日期选择器）中显示的日期"
---

# calendar_month

### Description

@short: 设置迷你日历头部（日期选择器）中显示的日期

@signature: calendar_month: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 所选月份的第一天

### Returns
- ` text` - (string) - 月份标签元素的内部 html 内容

### Example

~~~jsx
const monthLabel = scheduler.date.date_to_str("%F %Y");
scheduler.templates.calendar_month = function (date) {
    return monthLabel(date);
};
~~~

### Details

:::note
 该模板仅在启用 [minical](guides/extensions-list.md#minicalendardatepicker) 插件时有效。 
::: 

![mini_calendar_templates](/img/mini_calendar_templates.png)

### Related API
- [calendar_date](api/template/calendar_date.md)
- [calendar_time](api/template/calendar_time.md)
- [calendar_scale_date](api/template/calendar_scale_date.md)

### Related Guides
- [Mini Calendar Templates](guides/mini-calendar-templates.md)
- [미니 캘린더(날짜 선택기)](guides/minicalendar.md)
