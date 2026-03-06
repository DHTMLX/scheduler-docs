---
sidebar_label: GRID_field
title: "GRID_field template"
description: "specifies the text in the columns"
---

# GRID_field
:::info
 This functionality is available in the PRO edition only. 
:::

### Description

@short: Specifies the text in the columns

@signature: GRID_field: (field_name: string, event: object) =\> string;

### Parameters

- `field_name` - (required) *string* - the column's id  
- `event` - (required) *object* - the event object

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.grid_field = function(field_name, event){
    return event[field_name];
};
~~~

**Applicable views:** [Grid view](views/grid.md)

### Details

:::note
 The template requires the [grid_view](guides/extensions-list.md#grid-view) plugin to be activated. 
:::

Note, the template isn't applied to columns with id='date', id='start_date' or id='end_date'. Such columns use 
the [](api/template/gridname_full_date.md) and [](api/template/gridname_single_date.md)
templates, respectively.

### Related Guides
- [Grid View Templates](views/grid-view-templates.md)
