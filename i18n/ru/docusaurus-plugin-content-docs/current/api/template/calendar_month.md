---
sidebar_label: "calendar_month"
title: "calendar_month template"
description: "задаёт дату, отображаемую в заголовке Мини-Календаря (date picker)"
---

# calendar_month

### Description

@short: Задаёт дату, отображаемую в заголовке Мини-Календаря (date picker)

@signature: calendar_month: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - первый день выбранного месяца

### Returns
- ` text` - (string) - внутреннее html-содержимое для элемента с названием месяца

### Example

~~~jsx
const monthLabel = scheduler.date.date_to_str("%F %Y");
scheduler.templates.calendar_month = function (date) {
    return monthLabel(date);
};
~~~

### Details

:::note
 Этот шаблон работает только при включённом плагине [minical](guides/extensions-list.md#minicalendardatepicker). 
::: 

![mini_calendar_templates](/img/mini_calendar_templates.png)

### Related API
- [calendar_date](api/template/calendar_date.md)
- [calendar_time](api/template/calendar_time.md)
- [calendar_scale_date](api/template/calendar_scale_date.md)

### Related Guides
- [Шаблоны мини-календаря](guides/mini-calendar-templates.md)
- [Мини-календарь (Date Picker)](guides/minicalendar.md)
