---
sidebar_label: "map_end"
title: "map_end config"
description: "definiert das Datum, bis zu dem Ereignisse angezeigt werden"
---

# map_end

### Description

@short: Definiert das Datum, bis zu dem Ereignisse angezeigt werden

@signature: map_end: Date

### Example

~~~jsx
scheduler.config.map_start = new Date(2012, 7, 1);
scheduler.config.map_end = new Date(2014, 7, 1);
...
scheduler.init('scheduler_here', new Date(2013, 0, 10), "map");
~~~

**Default value:** 'map_start' (Wert) + 1 Jahr

**Applicable views:** [Map view](views/map.md)

### Related samples
- [Configuring the Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

:::note
 Diese Eigenschaft erfordert, dass das [map_view](guides/extensions-list.md#map-view) Plugin aktiviert ist. 
:::

### Related API
- [map_start](api/config/map_start.md)
