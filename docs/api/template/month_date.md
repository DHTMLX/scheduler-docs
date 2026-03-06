---
sidebar_label: month_date
title: "month_date template"
description: "specifies the date in the header of the view"
---

# month_date

### Description

@short: Specifies the date in the header of the view

@signature: month_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.month_date = function(date){
    var dateToStr_func = scheduler.date.date_to_str(scheduler.config.month_date);
    return  dateToStr_func(date);
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related Guides
- [Month View Templates](views/month-view-templates.md)
