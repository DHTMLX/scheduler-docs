---
sidebar_label: month_scale_date
title: "month_scale_date template"
description: "specifies the date format of the X-Axis of the view"
---

# month_scale_date

### Description

@short: Specifies the date format of the X-Axis of the view

@signature: month_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text for rendering in the scheduler

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
