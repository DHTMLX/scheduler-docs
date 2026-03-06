---
sidebar_label: min_map_size
title: "min_map_size config"
description: "defines the minimal possible size of the Map view during autoresize"
---

# min_map_size

### Description

@short: Defines the minimal possible size of the Map view during autoresize

@signature: min_map_size: number

### Example

~~~jsx
scheduler.config.min_map_size = 450;
~~~

**Default value:** 400

### Details

:::note
 The property requires the [container_autoresize](guides/extensions-list.md#container-autoresize) plugin to be enabled. 
:::

### Related API
- [container_autoresize](api/config/container_autoresize.md)
- [min_grid_size](api/config/min_grid_size.md)

### Related Guides
- [Full List of Extensions](guides/extensions-list.md#container-autoresize)
- [Map View](views/map.md#map-related-configuration-options)

### Change log
- added in version 4.4
