---
sidebar_label: calendar_scale_date
title: "calendar_scale_date template"
description: "specifies the format of week-days in the header of the Mini-Calendar (date picker)"
---

# calendar_scale_date

### Description

@short: Specifies the format of week-days in the header of the Mini-Calendar (date picker)

@signature: calendar_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date of a week-day for a header cell

### Returns
- ` text` - (string) - inner html string for the header cell

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
 The template requires the [minical](guides/extensions-list.md#mini-calendar-date-picker) plugin to be activated. 
:::

![mini_calendar_templates](/img/mini_calendar_templates.png)

### Related API
- [calendar_date](api/template/calendar_date.md)
- [calendar_month](api/template/calendar_month.md)
- [calendar_time](api/template/calendar_time.md)

### Related Guides
- [Mini Calendar Templates](guides/mini-calendar-templates.md)
- [Mini Calendar (Date Picker)](guides/minicalendar.md)
