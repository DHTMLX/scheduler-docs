---
sidebar_label: calendar_date
title: "calendar_date template"
description: "specifies the content of day-cells in the Mini-Calendar (date picker)"
---

# calendar_date

### Description

@short: Specifies the content of day-cells in the Mini-Calendar (date picker)

@signature: calendar_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the cell's date

### Returns
- ` text` - (string) - inner html for the date cell of the Mini_calendar

### Example

~~~jsx
const dayDate = scheduler.date.date_to_str("%d");
scheduler.templates.calendar_date = function (date) {
    // show the number of events per day in a tooltip of the calendar day-cell
    const dayEnd = scheduler.date.add(date, 1, "day");
    const events = scheduler.getEvents(date, dayEnd);
    return "<div title='"+events.length+" events'>" +dayDate(date)+ "</div>";
};
~~~

### Details

:::note
 The template requires the [minical](guides/extensions-list.md#mini-calendar-date-picker) plugin to be activated. 
::: 

![mini_calendar_templates](/img/mini_calendar_templates.png)

### Related API
- [calendar_month](api/template/calendar_month.md)
- [calendar_time](api/template/calendar_time.md)
- [calendar_scale_date](api/template/calendar_scale_date.md)

### Related Guides
- [Mini Calendar Templates](guides/mini-calendar-templates.md)
- [Mini Calendar (Date Picker)](guides/minicalendar.md)
