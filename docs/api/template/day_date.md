---
sidebar_label: day_date
title: "day_date template"
description: "specifies the date in the header of the Day and Units views"
---

# day_date

### Description

@short: Specifies the date in the header of the Day and Units views

@signature: day_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.day_date = function(date){
    const formatFunc = scheduler.date.date_to_str(scheduler.config.default_date);
    return formatFunc(date);
};
~~~

**Applicable views:** [Day view](views/day.md), [Units view](views/units.md)

### Related Guides
- [Day View Templates](views/day-view-templates.md)
