---
sidebar_label: "map_view_provider"
title: "map_view_provider config"
description: "定义使用哪个地图提供商"
---

# map_view_provider

### Description

@short: 定义使用哪个地图提供商

@signature: map_view_provider: string

### Example

~~~jsx
scheduler.config.map_view_provider = "googleMap";
...
scheduler.init('scheduler_here', new Date(2027, 05, 11), "map");
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 此属性仅在启用 [map_view](guides/extensions-list.md#mapview) 插件时有效。 
:::

也可以在 [map_settings](api/config/map_settings.md) 配置对象中设置地图提供商。

### Change log
- v7.1版本新增
