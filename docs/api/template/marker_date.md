---
sidebar_label: marker_date
title: "marker_date template"
description: "specifies the date of the event in the Google Maps popup marker"
---

# marker_date
:::warning 
The template is deprecated
:::
### Description

@short: Specifies the date of the event in the Google Maps popup marker

### Parameters

- `start` - (required) *Date* - the date when an event is scheduled to begin   
- `end` - (required) *Date* - the date when an event is scheduled to be completed
- `event` - (required) *object* - the event object

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.marker_date = function(date){
    return scheduler.date.date_to_str("%Y-%m-%d %H:%i"); 
};
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 The template requires the [map_view](guides/extensions-list.md#map-view) plugin to be activated. 
:::

### Related Guides
- [Map View Templates](views/map-view-templates.md)
