---
sidebar_label: map_text
title: "map_text template"
description: "specifies the text in the second column of the view"
---

# map_text

### Description

@short: Specifies the text in the second column of the view

@signature: map_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - the date when an event is scheduled to begin   
- `end` - (required) *Date* - the date when an event is scheduled to be completed
- `event` - (required) *object* - the event object

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.map_text = function(start,end,ev){
    return ev.text;
};
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 The template requires the [map_view](guides/extensions-list.md#map-view) plugin to be activated. 
:::

Note, if the `map_text` template isn't specified, the 'd-m-y' part of the date in the Google Maps popup marker will be set according to the [day_date](api/template/day_date.md) template.

### Related Guides
- [Map View Templates](views/map-view-templates.md)
