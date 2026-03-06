---
sidebar_label: "month_day"
title: "month_day template"
description: "definiert, wie der Tag in einer Zelle angezeigt wird"
---

# month_day

### Description

@short: Definiert, wie der Tag in einer Zelle angezeigt wird

@signature: month_day: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - das zu formatierende Datum

### Returns
- ` text` - (string) - HTML-Text, der zur Anzeige im Scheduler verwendet wird

### Example

~~~jsx
scheduler.templates.month_day = function(date){
    var dateToStr_func = scheduler.date.date_to_str(scheduler.config.month_day);
    return  dateToStr_func(date);
};
~~~

**Applicable views:** [Month view](views/month.md), [Year view](views/year.md)

### Related Guides
- [Month View Templates](views/month-view-templates.md)
- [Jahresansicht-Vorlagen](views/year-view-templates.md)
