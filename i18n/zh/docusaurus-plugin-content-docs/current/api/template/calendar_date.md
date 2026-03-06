---
sidebar_label: "calendar_date"
title: "calendar_date template"
description: "定义迷你日历（日期选择器）中日期单元格内显示的内容"
---

# calendar_date

### Description

@short: 定义迷你日历（日期选择器）中日期单元格内显示的内容

@signature: calendar_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 表示该单元格日期的日期对象

### Returns
- ` text` - (string) - 迷你日历日期单元格的内部HTML内容

### Example

~~~jsx
const dayDate = scheduler.date.date_to_str("%d");
scheduler.templates.calendar_date = function (date) {
    // 在日历单元格的tooltip中显示当天事件的数量
    const dayEnd = scheduler.date.add(date, 1, "day");
    const events = scheduler.getEvents(date, dayEnd);
    return "<div title='"+events.length+" events'>" +dayDate(date)+ "</div>";
};
~~~

### Details

:::note
 该模板仅在启用[minical](guides/extensions-list.md#minicalendardatepicker)插件时生效。 
::: 

![mini_calendar_templates](/img/mini_calendar_templates.png)

### Related API
- [calendar_month](api/template/calendar_month.md)
- [calendar_time](api/template/calendar_time.md)
- [calendar_scale_date](api/template/calendar_scale_date.md)

### Related Guides
- [Mini Calendar Templates](guides/mini-calendar-templates.md)
- [미니 캘린더(날짜 선택기)](guides/minicalendar.md)
