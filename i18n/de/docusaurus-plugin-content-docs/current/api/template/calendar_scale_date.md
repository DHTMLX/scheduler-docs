---
sidebar_label: "calendar_scale_date"
title: "calendar_scale_date template"
description: "Legt das Format für die Wochentagsbeschriftungen im Mini-Calendar-Header (Datumsauswahl) fest"
---

# calendar_scale_date

### Description

@short: Legt das Format für die Wochentagsbeschriftungen im Mini-Calendar-Header (Datumsauswahl) fest

@signature: calendar_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - Das spezifische Datum, das einen Wochentag für die Header-Zelle repräsentiert

### Returns
- ` text` - (string) - Der innere HTML-Inhalt für die Header-Zelle

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
 Diese Vorlage funktioniert nur, wenn das [minical](guides/extensions-list.md#mini-calendar-date-picker) Plugin aktiviert ist. 
:::

![mini_calendar_templates](/img/mini_calendar_templates.png)

### Related API
- [calendar_date](api/template/calendar_date.md)
- [calendar_month](api/template/calendar_month.md)
- [calendar_time](api/template/calendar_time.md)

### Related Guides
- [Mini-Kalender-Vorlagen](guides/mini-calendar-templates.md)
- [Mini-Kalender (Datumsauswahl)](guides/minicalendar.md)
