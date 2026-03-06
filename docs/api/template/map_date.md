---
sidebar_label: map_date
title: "map_date template"
description: "specifies the date in the header of the view"
---

# map_date

### Description

@short: Specifies the date in the header of the view

@signature: map_date: (start: Date, end: Date) =\> string

### Parameters

- `start` - (required) *Date* - the start date of the view
- `end` - (required) *Date* - the end date of the view

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
//default definition
scheduler.templates.map_date = function(start, end) {
     return '';
};
~~~

**Applicable views:** [Map view](views/map.md)

### Related samples
- [Configuring the Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

:::note
 The template requires the [map_view](guides/extensions-list.md#map-view) plugin to be activated. 
:::

### Related Guides
- [Map View Templates](views/map-view-templates.md)
