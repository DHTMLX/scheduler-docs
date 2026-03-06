---
sidebar_label: day_scale_date
title: "day_scale_date template"
description: "specifies the date in the sub-header of the Day view"
---

# day_scale_date

### Description

@short: Specifies the date in the sub-header of the Day view

@signature: day_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
const formatDayScale = scheduler.date.date_to_str("%j %M %Y");

scheduler.templates.day_scale_date = function(date){
    return formatDayScale(date);
};
~~~

**Applicable views:** [Day view](views/day.md)

### Related Guides
- [Day View Templates](views/day-view-templates.md)
