---
sidebar_label: "map_start"
title: "map_start config"
description: "Gibt das Datum an, ab dem Ereignisse angezeigt werden"
---

# map_start

### Description

@short: Gibt das Datum an, ab dem Ereignisse angezeigt werden

@signature: map_start: Date

### Example

~~~jsx
scheduler.config.map_start = new Date(2025, 7, 1);
scheduler.config.map_end = new Date(2027, 7, 1);
...
scheduler.init('scheduler_here', new Date(2026, 0, 10), "map");
~~~

**Default value:** das Datum des aktuellen Benutzers

**Applicable views:** [Map view](views/map.md)

### Related samples
- [Configuring the Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

:::note
 Diese Eigenschaft erfordert, dass das [map_view](guides/extensions-list.md#map-view) Plugin aktiviert ist. 
:::

### Related API
- [map_end](api/config/map_end.md)
