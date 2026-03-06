---
sidebar_label: hour_scale
title: "hour_scale template"
description: "specifies the items of the Y-Axis"
---

# hour_scale

### Description

@short: Specifies the items of the Y-Axis

@signature: hour_scale: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.hour_scale = function(date){
    return scheduler.date.date_to_str(scheduler.config.hour_date)(date);
};
~~~

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related Guides
- [Day View Templates](views/day-view-templates.md)
- [Week View Templates](views/week-view-templates.md)
