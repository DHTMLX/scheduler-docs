---
sidebar_label: "map_initial_zoom"
title: "map_initial_zoom config"
description: "设置地图视图中地图的初始缩放级别"
---

# map_initial_zoom

### Description

@short: 设置地图视图中地图的初始缩放级别

@signature: map_initial_zoom: number

### Example

~~~jsx
scheduler.config.map_initial_zoom = 7;
...
scheduler.init('scheduler_here', new Date(2013,05,11), "week");
~~~

**Default value:** 1

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 该属性仅在启用 [map_view](guides/extensions-list.md#mapview) 插件时生效。 
:::

**initial_zoom** 也可以在 [map_settings](api/config/map_settings.md) 配置对象中设置。

### Related API
- [map_initial_position](api/config/map_initial_position.md)
