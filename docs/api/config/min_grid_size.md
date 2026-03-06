---
sidebar_label: min_grid_size
title: "min_grid_size config"
description: "defines the minimal possible size of the Grid view during autoresize"
---

# min_grid_size
:::info
 This functionality is available in the PRO edition only. 
:::
### Description

@short: Defines the minimal possible size of the Grid view during autoresize

@signature: min_grid_size: number

### Example

~~~jsx
scheduler.config.min_grid_size = 30;
~~~

**Default value:** 25

### Details

:::note
 The property requires the [container_autoresize](guides/extensions-list.md#container-autoresize) plugin to be enabled. 
:::

### Related API
- [container_autoresize](api/config/container_autoresize.md)
- [min_map_size](api/config/min_map_size.md)

### Related Guides
- [Full List of Extensions](guides/extensions-list.md#container-autoresize)
- [Grid View](views/grid.md)

### Change log
- added in version 4.4
