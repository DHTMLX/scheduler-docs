---
sidebar_label: map_initial_position
title: "map_initial_position config"
description: "sets the initial position of the map"
---

# map_initial_position
:::warning 
The property is deprecated
:::
### Description

@short: Sets the initial position of the map

@signature: map_initial_position: any

### Example

~~~jsx
scheduler.config.map_initial_position =new google.maps.LatLng(51.477840, -0.001492);
...
scheduler.init('scheduler_here',new Date(2027,05,11),"map");
~~~

**Default value:** google.maps.LatLng(48.724, 8.215)

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 The property requires the [map_view](guides/extensions-list.md#map-view) plugin to be activated. 
:::

### Related API
- [map_initial_zoom](api/config/map_initial_zoom.md)

### Change log
- deprecated since v7.1
