---
sidebar_label: "month_date"
title: "month_date template"
description: "legt das im Header der Ansicht angezeigte Datum fest"
---

# month_date

### Description

@short: Legt das im Header der Ansicht angezeigte Datum fest

@signature: month_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - das Datum, das formatiert werden soll

### Returns
- ` text` - (string) - HTML-Text, der im Scheduler angezeigt wird

### Example

~~~jsx
scheduler.templates.month_date = function(date){
    const dateToStr_func = scheduler.date.date_to_str(scheduler.config.month_date);
    return  dateToStr_func(date);
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related Guides
- [Month View Templates](views/month-view-templates.md)
