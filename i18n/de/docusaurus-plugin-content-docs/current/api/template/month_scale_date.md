---
sidebar_label: "month_scale_date"
title: "month_scale_date template"
description: "definiert das Datumsformat, das auf der X-Achse in der Monatsansicht verwendet wird"
---

# month_scale_date

### Description

@short: Definiert das Datumsformat, das auf der X-Achse in der Monatsansicht verwendet wird

@signature: month_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - Das Datum, das formatiert werden soll

### Returns
- ` text` - (string) - HTML-Text, der im Scheduler angezeigt wird

### Example

~~~jsx
const formatMonthScale = scheduler.date.date_to_str("%l");

scheduler.templates.month_scale_date = function(date){
    return formatMonthScale(date);
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related Guides
- [Month View Templates](views/month-view-templates.md)
