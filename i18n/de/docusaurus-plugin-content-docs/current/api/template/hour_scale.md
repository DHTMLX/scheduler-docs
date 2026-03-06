---
sidebar_label: "hour_scale"
title: "hour_scale template"
description: "definiert die Elemente, die auf der Y-Achse angezeigt werden"
---

# hour_scale

### Description

@short: Definiert die Elemente, die auf der Y-Achse angezeigt werden

@signature: hour_scale: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - das zu formatierende Datum

### Returns
- ` text` - (string) - HTML-Text, der zur Anzeige im Scheduler verwendet wird

### Example

~~~jsx
scheduler.templates.hour_scale = function(date){
    return scheduler.date.date_to_str(scheduler.config.hour_date)(date);
};
~~~

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related Guides
- [Day-Ansicht Vorlagen](views/day-view-templates.md)
- [Week-View-Vorlagen](views/week-view-templates.md)
