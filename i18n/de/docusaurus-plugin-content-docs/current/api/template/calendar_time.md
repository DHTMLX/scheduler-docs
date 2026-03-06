---
sidebar_label: "calendar_time"
title: "calendar_time template"
description: "definiert das Datumsformat, das für die Start- und Enddatum-Felder in der Lightbox verwendet wird"
---

# calendar_time

### Description

@short: Definiert das Datumsformat, das für die Start- und Enddatum-Felder in der Lightbox verwendet wird

@signature: calendar_time: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - der Datumswert, der formatiert werden muss

### Returns
- ` text` - (string) - der HTML-Inhalt, der innerhalb des schedulers angezeigt wird

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
- [Mini-Kalender-Vorlagen](guides/mini-calendar-templates.md)
- [Mini-Kalender (Datumsauswahl)](guides/minicalendar.md)
