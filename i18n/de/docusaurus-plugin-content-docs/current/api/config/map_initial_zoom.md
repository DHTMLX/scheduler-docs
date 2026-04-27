---
sidebar_label: "map_initial_zoom"
title: "map_initial_zoom config"
description: "legt den Start-Zoom-Level für die Karte in der Map-Ansicht fest"
---

# map_initial_zoom

### Description

@short: Legt den Start-Zoom-Level für die Karte in der Map-Ansicht fest

@signature: map_initial_zoom: number

### Example

~~~jsx
scheduler.config.map_initial_zoom = 7;
...
scheduler.init('scheduler_here', new Date(2027,05,11), "week");
~~~

**Default value:** 1

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 Diese Eigenschaft funktioniert nur, wenn das [map_view](guides/extensions-list.md#map-view) Plugin aktiviert ist. 
:::

Der **initial_zoom** kann auch innerhalb des [map_settings](api/config/map_settings.md) Konfigurationsobjekts gesetzt werden.

### Related API
- [map_initial_position](api/config/map_initial_position.md)
