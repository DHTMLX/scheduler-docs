---
sidebar_label: "map_error_position"
title: "map_error_position config"
description: "Definiert die Position, die auf der Karte angezeigt wird, wenn der Standort eines Events nicht bestimmt werden kann"
---

# map_error_position
:::warning
Die Funktion ist veraltet
:::
### Description

@short: Definiert die Position, die auf der Karte angezeigt wird, wenn der Standort eines Events nicht bestimmt werden kann

@signature: map_error_position: any

### Example

~~~jsx
scheduler.config.map_error_position = new google.maps.LatLng(51.477840, -0.001492);
...
scheduler.init('scheduler_here',new Date(2013,05,11),"map");
~~~

**Default value:** google.maps.LatLng(15, 15)

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 Diese Eigenschaft erfordert, dass das [map_view](guides/extensions-list.md#map-view) Plugin aktiviert ist. 
:::

Die 'error position' wird in folgenden Situationen angewendet:

1. Wenn einem Event eine oder beide Koordinaten fehlen (z.B. Koordinatenwerte sind '0', 'null' oder 'undefined') und die Option [map_resolve_event_location](api/config/map_resolve_event_location.md) deaktiviert ist.
2. Wenn einem Event eine oder beide Koordinaten fehlen und die Option [map_resolve_event_location](api/config/map_resolve_event_location.md) aktiviert ist, der Scheduler jedoch den Standort nicht auflösen kann.

### Related API
- [map_resolve_event_location](api/config/map_resolve_event_location.md)

### Change log
- deprecated seit Version 7.1
