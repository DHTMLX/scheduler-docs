---
sidebar_label: "calendar_month"
title: "calendar_month template"
description: "Legt das im Mini-Calendar-Header (Date Picker) angezeigte Datum fest."
---

# calendar_month

### Description

@short: Legt das im Mini-Calendar-Header (Date Picker) angezeigte Datum fest.

@signature: calendar_month: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - der erste Tag des ausgewählten Monats

### Returns
- ` text` - (string) - der HTML-Inhalt für das Monatsetikett-Element

### Example

~~~jsx
const monthLabel = scheduler.date.date_to_str("%F %Y");
scheduler.templates.calendar_month = function (date) {
    return monthLabel(date);
};
~~~

### Details

:::note
 Diese Vorlage funktioniert nur, wenn das [minical](guides/extensions-list.md#mini-calendar-date-picker) Plugin aktiviert ist. 
::: 

![mini_calendar_templates](/img/mini_calendar_templates.png)

### Related API
- [calendar_date](api/template/calendar_date.md)
- [calendar_time](api/template/calendar_time.md)
- [calendar_scale_date](api/template/calendar_scale_date.md)

### Related Guides
- [Mini-Kalender-Vorlagen](guides/mini-calendar-templates.md)
- [Mini-Kalender (Datumsauswahl)](guides/minicalendar.md)
