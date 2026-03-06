---
sidebar_label: marker_text
title: "marker_text template"
description: "specifies the text of the event in the Google Maps popup marker"
---

# marker_text
:::warning 
The template is deprecated
:::
### Description

@short: Specifies the text of the event in the Google Maps popup marker

### Parameters

- `start` - (required) *Date* - the date when an event is scheduled to begin   
- `end` - (required) *Date* - the date when an event is scheduled to be completed
- `event` - (required) *object* - the event object

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.marker_text = function(start,end,ev){
     return "<div><b>" + ev.text + "</b><br/><br/>" + (ev.event_location || '') + 
     "<br/><br/>" + scheduler.templates.marker_date(start) + " - " + 
     scheduler.templates.marker_date(end) + "</div>";
};
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 The template requires the [map_view](guides/extensions-list.md#map-view) plugin to be activated. 
:::

### Related Guides
- [Map View Templates](views/map-view-templates.md)
