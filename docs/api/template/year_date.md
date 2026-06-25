---
sidebar_label: year_date
title: "year_date template"
description: "specifies the date in the header of the view"
---

# year_date

### Description

@short: Specifies the date in the header of the view

@signature: year_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
const date_to_str = scheduler.date.date_to_str(scheduler.locale.labels.year_tab +" %Y");

scheduler.templates.year_date = function(date){
    return date_to_str(date);
};
~~~

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 The template requires the [year_view](guides/extensions-list.md#year) plugin to be activated. 
:::

### Related Guides
- [Year View Templates](views/year-view-templates.md)
