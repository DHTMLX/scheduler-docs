---
sidebar_label: "map_initial_position"
title: "map_initial_position config"
description: "Legt fest, an welcher Position die Karte startet"
---

# map_initial_position
:::warning
Die Funktion ist veraltet
:::
### Description

@short: Legt fest, an welcher Position die Karte startet

@signature: map_initial_position: any

### Example

~~~jsx
scheduler.config.map_initial_position = new google.maps.LatLng(51.477840, -0.001492);
...
scheduler.init('scheduler_here', new Date(2027,05,11), "map");
~~~

**Default value:** google.maps.LatLng(48.724, 8.215)

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 Diese Eigenschaft erfordert das aktivierte [map_view](guides/extensions-list.md#map-view) Plugin. 
:::

### Related API
- [map_initial_zoom](api/config/map_initial_zoom.md)

### Change log
- deprecated seit Version 7.1
