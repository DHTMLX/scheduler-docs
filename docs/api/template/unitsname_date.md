---
sidebar_label: UNITS_date
title: "UNITS_date template"
description: "specifies the date in the header of the view"
---

# UNITS_date
:::info
 This functionality is available in the PRO edition only. 
:::

### Description

@short: Specifies the date in the header of the view

@signature: UNITS_date: (date: Date) =\> string;

### Parameters
- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.unit_date = function(date){
        return scheduler.templates.day_date(date);
};
~~~

**Applicable views:** [Units view](views/units.md)

### Details

:::note
 The template requires the [units](guides/extensions-list.md#units) plugin to be activated. 
:::

### Related Guides
- [Units View Templates](views/units-view-templates.md)
