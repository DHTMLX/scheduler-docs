---
sidebar_label: "map_infowindow_max_width"
title: "map_infowindow_max_width config"
description: "Legt die maximale Breite für das Popup-Marker auf der Karte in der Map-Ansicht fest."
---

# map_infowindow_max_width

### Description

@short: Legt die maximale Breite für das Popup-Marker auf der Karte in der Map-Ansicht fest.

@signature: map_infowindow_max_width: number

### Example

~~~jsx
scheduler.config.map_infowindow_max_width = 350;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** 300

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 Diese Eigenschaft erfordert, dass das [map_view](guides/extensions-list.md#map-view) Plugin aktiviert ist. 
:::

Die Option **infowindow_max_width** kann auch innerhalb des [map_settings](api/config/map_settings.md) Konfigurationsobjekts gesetzt werden.
