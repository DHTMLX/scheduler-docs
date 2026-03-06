---
sidebar_label: map_error_position
title: "map_error_position config"
description: "sets the position that will be displayed on the map in case the event's location can't be identified"
---

# map_error_position
:::warning 
The property is deprecated
:::
### Description

@short: Sets the position that will be displayed on the map in case the event's location can't be identified

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
 The property requires the [map_view](guides/extensions-list.md#map-view) plugin to be activated. 
:::

The 'error position' will be applied in 2 cases:

1. An event doesn't have one of the coordinates (or both of them) specified (i.e. a coordinate has value '0', 'null', 'undefined') and the [map_resolve_event_location](api/config/map_resolve_event_location.md) option is disabled.
2. An event doesn't have one of coordinates (or both of them) specified and the [map_resolve_event_location](api/config/map_resolve_event_location.md) option is enabled, but the scheduler can't resolve the location.

### Related API
- [map_resolve_event_location](api/config/map_resolve_event_location.md)

### Change log
- deprecated since v7.1
