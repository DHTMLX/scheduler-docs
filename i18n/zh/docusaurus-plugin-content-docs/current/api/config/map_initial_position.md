---
sidebar_label: "map_initial_position"
title: "map_initial_position config"
description: "设置地图的初始显示位置"
---

# map_initial_position
:::warning 
此功能已棄用。
:::
### Description

@short: 设置地图的初始显示位置

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
 该属性需要启用 [map_view](guides/extensions-list.md#mapview) 插件。 
:::

### Related API
- [map_initial_zoom](api/config/map_initial_zoom.md)

### Change log
- 自 v7.1 版本起已废弃
