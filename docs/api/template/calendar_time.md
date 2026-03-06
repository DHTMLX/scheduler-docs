---
sidebar_label: calendar_time
title: "calendar_time template"
description: "specifies the date format of the lightbox's start and end date inputs"
---

# calendar_time

### Description

@short: Specifies the date format of the lightbox's start and end date inputs

@signature: calendar_time: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text for rendering in the scheduler

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
- [Mini Calendar (Date Picker)](guides/minicalendar.md)
