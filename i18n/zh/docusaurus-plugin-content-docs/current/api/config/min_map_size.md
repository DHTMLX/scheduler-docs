---
sidebar_label: "min_map_size"
title: "min_map_size config"
description: "定义 Map 视图在自动调整大小时可以缩小到的最小尺寸"
---

# min_map_size

### Description

@short: 定义 Map 视图在自动调整大小时可以缩小到的最小尺寸

@signature: min_map_size: number

### Example

~~~jsx
scheduler.config.min_map_size = 450;
~~~

**Default value:** 400

### Details

:::note
 该属性仅在启用 [container_autoresize](guides/extensions-list.md#containerautoresize) 插件时生效。 
:::

### Related API
- [container_autoresize](api/config/container_autoresize.md)
- [min_grid_size](api/config/min_grid_size.md)

### Related Guides
- [전체 확장 기능 목록](guides/extensions-list.md#containerautoresize)
- [Map View](views/map.md#maprelatedconfigurationoptions)

### Change log
- 在版本 4.4 中添加
