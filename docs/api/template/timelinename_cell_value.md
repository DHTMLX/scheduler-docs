---
sidebar_label: TIMELINE_cell_value
title: "TIMELINE_cell_value template"
description: "specifies the number of scheduled events in a cell of the view"
---

# TIMELINE_cell_value
:::info
 This functionality is available in the PRO edition only. 
:::

### Description

@short: Specifies the number of scheduled events in a cell of the view

@signature: TIMELINE_cell_value: (evs: array, date: Date, section: object) =\> string;

### Parameters

- `evs` - (required) *array* - an array of objects of events contained in a cell
- `date` - (required) *Date* - the date of a cell
- `section` - (required) *object* - the section object

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.timeline_cell_value = function(evs, date, section){
    return evs?evs.length:"";
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 The template requires the [timeline](guides/extensions-list.md#timeline) plugin to be activated. 
:::

:::note

By default, the template is called only in the 'cell' mode of the Timeline view. But if you enable the **cell_template** config of the [Timeline view](api/method/createtimelineview.md), the template will be called in [all other modes of the view](views/timeline.md#custom-content-in-cells) as well.
 
:::

### Related API
- [`TIMELINE_row_class`](api/template/timelinename_row_class.md)

### Related Guides
- [Timeline View Templates](views/timeline-view-templates.md)
