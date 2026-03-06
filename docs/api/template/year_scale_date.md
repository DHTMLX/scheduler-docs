---
sidebar_label: year_scale_date
title: "year_scale_date template"
description: "specifies the day's name in the sub-header of a month block of the view"
---

# year_scale_date

### Description

@short: Specifies the day's name in the sub-header of a month block of the view

@signature: year_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
const formatScaleDate = scheduler.date.date_to_str("%D");
scheduler.templates.year_scale_date = function(date){
    return formatScaleDate(date);
};
~~~

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 The template requires the [year_view](guides/extensions-list.md#year) plugin to be activated. 
:::

### Related Guides
- [Year View Templates](views/year-view-templates.md)
