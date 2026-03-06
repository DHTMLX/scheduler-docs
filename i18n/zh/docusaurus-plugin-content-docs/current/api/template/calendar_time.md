---
sidebar_label: "calendar_time"
title: "calendar_time template"
description: "定义 lightbox 中开始日期和结束日期字段使用的日期格式"
---

# calendar_time

### Description

@short: 定义 lightbox 中开始日期和结束日期字段使用的日期格式

@signature: calendar_time: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 需要格式化的日期值

### Returns
- ` text` - (string) - 在 scheduler 内显示的 HTML 内容

### Example

~~~jsx
scheduler.templates.calendar_time = scheduler.date.date_to_str("%d-%m-%Y");
~~~

### Details

![mini_calendar_templates](/img/mini_calendar_templates.png)

### Related API
- [calendar_date](api/template/calendar_date.md)
- [calendar_month](api/template/calendar_month.md)
- [calendar_scale_date](api/template/calendar_scale_date.md)

### Related Guides
- [Mini Calendar Templates](guides/mini-calendar-templates.md)
- [미니 캘린더(날짜 선택기)](guides/minicalendar.md)
