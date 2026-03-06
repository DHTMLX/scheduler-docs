---
sidebar_label: year_month
title: "year_month template"
description: "specifies the month's name in the header of a month block of the view."
---

# year_month

### Description

@short: Specifies the month's name in the header of a month block of the view.

@signature: year_month: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
const formatMonth = scheduler.date.date_to_str("%F");
scheduler.templates.year_month = function(date){
    return formatMonth(date);
};
~~~

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 The template requires the [year_view](guides/extensions-list.md#year) plugin to be activated. 
:::

### Related Guides
- [Year View Templates](views/year-view-templates.md)
