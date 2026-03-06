---
sidebar_label: "min_map_size"
title: "min_map_size config"
description: "определяет минимальный размер, до которого может сжиматься вид Map при автоподстройке размера"
---

# min_map_size

### Description

@short: Определяет минимальный размер, до которого может сжиматься вид Map при автоподстройке размера

@signature: min_map_size: number

### Example

~~~jsx
scheduler.config.min_map_size = 450;
~~~

**Default value:** 400

### Details

:::note
 Это свойство работает только если активирован плагин [container_autoresize](guides/extensions-list.md#containerautoresize). 
:::

### Related API
- [container_autoresize](api/config/container_autoresize.md)
- [min_grid_size](api/config/min_grid_size.md)

### Related Guides
- [Полный список расширений](guides/extensions-list.md#containerautoresize)
- [Map View](views/map.md#map-related-configuration-options)

### Change log
- добавлено в версии 4.4
