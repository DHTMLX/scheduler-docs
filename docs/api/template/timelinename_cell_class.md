---
sidebar_label: TIMELINE_cell_class
title: "TIMELINE_cell_class template"
description: "specifies the CSS class that will be applied to a cell of the view"
---

# TIMELINE_cell_class
:::info
 This functionality is available in the PRO edition only. 
:::

### Description

@short: Specifies the CSS class that will be applied to a cell of the view

@signature: TIMELINE_cell_class: (evs: array, date: Date, section: object) =\> string;

### Parameters

- `evs` - (required) *array* - an array of objects of events contained in a cell (defined only in the 'cell' mode)
- `date` - (required) *Date* - the date of a column
- `section` - (required) *object* - the section object

### Returns
- ` css_class` - (string) - css class for related element

### Example

~~~jsx
scheduler.templates.timeline_cell_class = function(evs, date, section){
    return "";
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 The template requires the [timeline](guides/extensions-list.md#timeline) plugin to be activated. 
:::

### Related API
- [`TIMELINE_row_class`](api/template/timelinename_row_class.md)

### Related Guides
- [Timeline View Templates](views/timeline-view-templates.md)
