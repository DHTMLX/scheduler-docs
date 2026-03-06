---
sidebar_label: map_time
title: "map_time template"
description: "specifies the date in the first column of the view"
---

# map_time

### Description

@short: Specifies the date in the first column of the view

@signature: map_time: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - the date when an event is scheduled to begin   
- `end` - (required) *Date* - the date when an event is scheduled to be completed
- `event` - (required) *object* - the event object

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.map_time = function(start,end,ev){
    if (ev._timed)
        return this.day_date(ev.start_date, ev.end_date, ev) + " " + 
        this.event_date(start);
    else
        return scheduler.templates.day_date(start) + " &ndash; " + 
        scheduler.templates.day_date(end);
};
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 The template requires the [map_view](guides/extensions-list.md#map-view) plugin to be activated. 
:::

### Related Guides
- [Map View Templates](views/map-view-templates.md)
