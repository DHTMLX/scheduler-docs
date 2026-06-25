---
sidebar_label: map_end
title: "map_end config"
description: "sets the date to display events until"
---

# map_end

### Description

@short: Sets the date to display events until

@signature: map_end: Date

### Example

~~~jsx
scheduler.config.map_start = new Date(2025, 7, 1);
scheduler.config.map_end = new Date(2027, 7, 1);
...
scheduler.init('scheduler_here', new Date(2026, 0, 10), "map");
~~~

**Default value:** 'map_start' (value) + 1 year

**Applicable views:** [Map view](views/map.md)

### Related samples
- [Configuring the Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

:::note
 The property requires the [map_view](guides/extensions-list.md#map-view) plugin to be activated. 
:::

### Related API
- [map_start](api/config/map_start.md)
