---
sidebar_label: week_scale_date
title: "week_scale_date template"
description: "specifies the date in the sub-header of the view"
---

# week_scale_date

### Description

@short: Specifies the date in the sub-header of the view

@signature: week_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
const format = scheduler.date.date_to_str(scheduler.config.day_date);
scheduler.templates.week_scale_date = function(date){
    return format(date);
};
~~~

**Applicable views:** [Week view](views/week.md)

### Related Guides
- [Week View Templates](views/week-view-templates.md)
