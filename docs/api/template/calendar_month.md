---
sidebar_label: calendar_month
title: "calendar_month template"
description: "specifies the date in the header of the Mini-Calendar (date picker)"
---

# calendar_month

### Description

@short: Specifies the date in the header of the Mini-Calendar (date picker)

@signature: calendar_month: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the first day of a selected month

### Returns
- ` text` - (string) - inner html of the month label element

### Example

~~~jsx
const monthLabel = scheduler.date.date_to_str("%F %Y");
scheduler.templates.calendar_month = function (date) {
    return monthLabel(date);
};
~~~

### Details

:::note
 The template requires the [minical](guides/extensions-list.md#mini-calendar-date-picker) plugin to be activated. 
::: 

![mini_calendar_templates](/img/mini_calendar_templates.png)

### Related API
- [calendar_date](api/template/calendar_date.md)
- [calendar_time](api/template/calendar_time.md)
- [calendar_scale_date](api/template/calendar_scale_date.md)

### Related Guides
- [Mini Calendar Templates](guides/mini-calendar-templates.md)
- [Mini Calendar (Date Picker)](guides/minicalendar.md)
