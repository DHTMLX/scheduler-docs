---
sidebar_label: month_day
title: "month_day template"
description: "specifies the format of the day in a cell"
---

# month_day

### Description

@short: Specifies the format of the day in a cell

@signature: month_day: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text for rendering in the scheduler

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
- [Year View Templates](views/year-view-templates.md)
