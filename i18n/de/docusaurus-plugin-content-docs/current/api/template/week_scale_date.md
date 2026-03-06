---
sidebar_label: "week_scale_date"
title: "week_scale_date template"
description: "definiert das Datum, das in der Sub-Header-Ansicht angezeigt wird"
---

# week_scale_date

### Description

@short: Definiert das Datum, das in der Sub-Header-Ansicht angezeigt wird

@signature: week_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - das Datum, das formatiert werden soll

### Returns
- ` text` - (string) - HTML-Text, der für das Rendering im Scheduler verwendet wird

### Example

~~~jsx
var format = scheduler.date.date_to_str(scheduler.config.day_date);
scheduler.templates.week_scale_date = function(date){
    return format(date);
};
~~~

**Applicable views:** [Week view](views/week.md)

### Related Guides
- [Week-View-Vorlagen](views/week-view-templates.md)
