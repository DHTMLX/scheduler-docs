---
sidebar_label: "calendar_date"
title: "calendar_date template"
description: "definiert, was in den Tageszellen des Mini-Kalenders (Date Picker) angezeigt wird"
---

# calendar_date

### Description

@short: Definiert, was in den Tageszellen des Mini-Kalenders (Date Picker) angezeigt wird

@signature: calendar_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - das Datum, das durch die Zelle repräsentiert wird

### Returns
- ` text` - (string) - der innere HTML-Inhalt für die Datumzelle des Mini-Kalenders

### Example

~~~jsx
const dayDate = scheduler.date.date_to_str("%d");
scheduler.templates.calendar_date = function (date) {
    // zeigt die Anzahl der Ereignisse für den Tag als tooltip in der Kalenderzelle an
    const dayEnd = scheduler.date.add(date, 1, "day");
    const events = scheduler.getEvents(date, dayEnd);
    return "<div title='"+events.length+" events'>" +dayDate(date)+ "</div>";
};
~~~

### Details

:::note
 Die Vorlage funktioniert nur, wenn das [minical](guides/extensions-list.md#mini-calendar-date-picker) Plugin aktiviert ist. 
::: 

![mini_calendar_templates](/img/mini_calendar_templates.png)

### Related API
- [calendar_month](api/template/calendar_month.md)
- [calendar_time](api/template/calendar_time.md)
- [calendar_scale_date](api/template/calendar_scale_date.md)

### Related Guides
- [Mini-Kalender-Vorlagen](guides/mini-calendar-templates.md)
- [Mini-Kalender (Datumsauswahl)](guides/minicalendar.md)
