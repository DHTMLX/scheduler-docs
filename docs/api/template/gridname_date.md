---
sidebar_label: GRID_date
title: "GRID_date template"
description: "specifies the date in the header of the view"
---

# GRID_date
:::info
 This functionality is available in the PRO edition only. 
:::

### Description

@short: Specifies the date in the header of the view

@signature: GRID_date: (start: Date, end: Date) =\> string;

### Parameters

- `start` - (required) *Date* - the start date of the view
- `end` - (required) *Date* - the end date of the view

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
//default definition
scheduler.templates.grid_date = function(start, end){
    return scheduler.templates.day_date(start)
    + " - "
    + scheduler.templates.day_date(end);
};
~~~

**Applicable views:** [Grid view](views/grid.md)

### Details

:::note
 The template requires the [grid_view](guides/extensions-list.md#grid-view) plugin to be activated. 
:::

### Related Guides
- [Grid View Templates](views/grid-view-templates.md)
