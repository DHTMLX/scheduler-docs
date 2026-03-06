---
sidebar_label: "day_scale_date"
title: "day_scale_date template"
description: "Legt das Datum fest, das in der Unterüberschrift der Day-Ansicht angezeigt wird"
---

# day_scale_date

### Description

@short: Legt das Datum fest, das in der Unterüberschrift der Day-Ansicht angezeigt wird

@signature: day_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - Das Datum, das formatiert werden soll

### Returns
- ` text` - (string) - HTML-Text, der für die Darstellung im Scheduler verwendet wird

### Example

~~~jsx
const formatDayScale = scheduler.date.date_to_str("%j %M %Y");

scheduler.templates.day_scale_date = function(date){
    return formatDayScale(date);
};
~~~

**Applicable views:** [Day view](views/day.md)

### Related Guides
- [Day-Ansicht Vorlagen](views/day-view-templates.md)
