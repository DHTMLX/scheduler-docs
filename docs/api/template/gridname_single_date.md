---
sidebar_label: GRID_single_date
title: "GRID_single_date template"
description: "specifies the format of dates in columns with id='start_date' or id='end_date'"
---

# GRID_single_date
:::info
 This functionality is available in the PRO edition only. 
:::

### Description

@short: Specifies the format of dates in columns with id='start_date' or id='end_date'

@signature: GRID_single_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.grid_single_date = function(date){
    return scheduler.templates.day_date(date)+" "+this.event_date(date);
};
~~~

**Applicable views:** [Grid view](views/grid.md)

### Details

:::note
 The template requires the [grid_view](guides/extensions-list.md#grid-view) plugin to be activated. 
:::

### Related API
- [GRID_full_date](api/template/gridname_full_date.md)

### Related Guides
- [Grid View Templates](views/grid-view-templates.md)
