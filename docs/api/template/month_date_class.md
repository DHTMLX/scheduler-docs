---
sidebar_label: month_date_class
title: "month_date_class template"
description: "specifies the CSS class that will be applied to a day cell"
---

# month_date_class

### Description

@short: Specifies the CSS class that will be applied to a day cell

@signature: month_date_class: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` css_class` - (string) - css class for related element

### Example

~~~jsx
scheduler.templates.month_date_class = function(date){
    return "";
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related Guides
- [Month View Templates](views/month-view-templates.md)
