---
sidebar_label: "min_grid_size"
title: "min_grid_size config"
description: "定义 Grid 视图在自动调整大小时可以缩小到的最小尺寸"
---

# min_grid_size
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 定义 Grid 视图在自动调整大小时可以缩小到的最小尺寸

@signature: min_grid_size: number

### Example

~~~jsx
scheduler.config.min_grid_size = 30;
~~~

**Default value:** 25

### Details

:::note
 该设置仅在启用 [container_autoresize](guides/extensions-list.md#containerautoresize) 插件时生效。 
:::

### Related API
- [container_autoresize](api/config/container_autoresize.md)
- [min_map_size](api/config/min_map_size.md)

### Related Guides
- [전체 확장 기능 목록](guides/extensions-list.md#containerautoresize)
- [Grid View](views/grid.md)

### Change log
- 在版本 4.4 中添加
