---
sidebar_label: "calendar_time"
title: "calendar_time template"
description: "определяет формат даты, используемый для полей даты начала и окончания в lightbox"
---

# calendar_time

### Description

@short: Определяет формат даты, используемый для полей даты начала и окончания в lightbox

@signature: calendar_time: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - значение даты, которое необходимо отформатировать

### Returns
- ` text` - (string) - HTML-контент для отображения внутри scheduler

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
- [Шаблоны мини-календаря](guides/mini-calendar-templates.md)
- [Мини-календарь (Date Picker)](guides/minicalendar.md)
