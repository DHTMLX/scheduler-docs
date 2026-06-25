---
sidebar_label: "map_error_position"
title: "map_error_position config"
description: "定义当事件位置无法确定时在地图上显示的位置"
---

# map_error_position
:::warning 
此功能已棄用。
:::
### Description

@short: 定义当事件位置无法确定时在地图上显示的位置

@signature: map_error_position: any

### Example

~~~jsx
scheduler.config.map_error_position = new google.maps.LatLng(51.477840, -0.001492);
...
scheduler.init('scheduler_here',new Date(2027,05,11),"map");
~~~

**Default value:** google.maps.LatLng(15, 15)

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 此属性需要启用 [map_view](guides/extensions-list.md#mapview) 插件。 
:::

"错误位置"适用于以下情况:

1. 当事件缺少一个或两个坐标（例如，坐标值为 '0'、'null' 或 'undefined'）且 [map_resolve_event_location](api/config/map_resolve_event_location.md) 选项被关闭时。
2. 当事件缺少一个或两个坐标且启用了 [map_resolve_event_location](api/config/map_resolve_event_location.md) 选项，但 scheduler 无法解析该位置时。

### Related API
- [map_resolve_event_location](api/config/map_resolve_event_location.md)

### Change log
- 自 v7.1 起废弃
