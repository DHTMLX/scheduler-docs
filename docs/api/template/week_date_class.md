---
sidebar_label: week_date_class
title: "week_date_class template"
description: "specifies the CSS class that will be applied to a day cell"
---

# week_date_class

### Description

@short: Specifies the CSS class that will be applied to a day cell

@signature: week_date_class: (start: Date, today: Date) =\> string

### Parameters

- `start` - (required) *Date* - the start date of the column
- `today` - (required) *Date* - the current date

### Returns
- ` css_class` - (string) - css class for related element

### Example

~~~jsx
scheduler.templates.week_date_class = function(start, today){
    return "";
};
~~~

**Applicable views:** [Week view](views/week.md), [Units view](views/units.md)

### Related Guides
- [Week View Templates](views/week-view-templates.md)
