---
sidebar_label: "day_date"
title: "day_date template"
description: "definiert das im Header für die Day- und Units-Views angezeigte Datum"
---

# day_date

### Description

@short: Definiert das im Header für die Day- und Units-Views angezeigte Datum

@signature: day_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - das zu formatierende Datum

### Returns
- ` text` - (string) - HTML-Text, der im Scheduler angezeigt wird

### Example

~~~jsx
scheduler.templates.day_date = function(date){
    var formatFunc = scheduler.date.date_to_str(scheduler.config.default_date);
    return formatFunc(date);
};
~~~

**Applicable views:** [Day view](views/day.md), [Units view](views/units.md)

### Related Guides
- [Day-Ansicht Vorlagen](views/day-view-templates.md)
