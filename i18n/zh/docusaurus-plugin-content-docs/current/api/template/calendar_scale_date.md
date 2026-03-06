---
sidebar_label: "calendar_scale_date"
title: "calendar_scale_date template"
description: "设置 Mini-Calendar 头部（日期选择器）中周日标签的格式"
---

# calendar_scale_date

### Description

@short: 设置 Mini-Calendar 头部（日期选择器）中周日标签的格式

@signature: calendar_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 表示头部单元格中某个周日的具体日期

### Returns
- ` text` - (string) - 头部单元格的内部 HTML 内容

### Example

~~~jsx
const weekDayLabel = scheduler.date.date_to_str("%D");
scheduler.templates.calendar_scale_date = function (date) {
    // M | T | W | T | F | S | S
    return weekDayLabel(date).substr(0, 1);
};
~~~

### Details

:::note
 该模板仅在启用 [minical](guides/extensions-list.md#minicalendardatepicker) 插件时生效。 
:::

![mini_calendar_templates](/img/mini_calendar_templates.png)

### Related API
- [calendar_date](api/template/calendar_date.md)
- [calendar_month](api/template/calendar_month.md)
- [calendar_time](api/template/calendar_time.md)

### Related Guides
- [Mini Calendar Templates](guides/mini-calendar-templates.md)
- [미니 캘린더(날짜 선택기)](guides/minicalendar.md)
