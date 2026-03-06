---
sidebar_label: map_start
title: "map_start config"
description: "sets the date to start displaying events from"
---

# map_start

### Description

@short: Sets the date to start displaying events from

@signature: map_start: Date

### Example

~~~jsx
scheduler.config.map_start = new Date(2012, 7, 1);
scheduler.config.map_end = new Date(2014, 7, 1);
...
scheduler.init('scheduler_here', new Date(2013, 0, 10), "map");
~~~

**Default value:** the current user's date

**Applicable views:** [Map view](views/map.md)

### Related samples
- [Configuring the Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

:::note
 The property requires the [map_view](guides/extensions-list.md#map-view) plugin to be activated. 
:::

### Related API
- [map_end](api/config/map_end.md)
