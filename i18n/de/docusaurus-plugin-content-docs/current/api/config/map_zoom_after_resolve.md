---
sidebar_label: "map_zoom_after_resolve"
title: "map_zoom_after_resolve config"
description: "Legt den Zoom-Level fest, mit dem der Standort des Benutzers angezeigt wird, wenn der Browser um Erlaubnis bittet und der Benutzer zustimmt."
---

# map_zoom_after_resolve

### Description

@short: Legt den Zoom-Level fest, mit dem der Standort des Benutzers angezeigt wird, wenn der Browser um Erlaubnis bittet und der Benutzer zustimmt.

@signature: map_zoom_after_resolve: number

### Example

~~~jsx
scheduler.config.map_zoom_after_resolve = 10;  
...  
scheduler.init('scheduler_here', new Date(2027, 05, 11), "week");
~~~

**Default value:** 15

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 Die Eigenschaft erfordert, dass das [map_view](guides/extensions-list.md#map-view) Plugin aktiviert ist. 
:::

Die Einstellung **zoom_after_resolve** kann auch innerhalb des Konfigurationsobjekts [map_settings](api/config/map_settings.md) definiert werden.
