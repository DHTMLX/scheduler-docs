---
sidebar_label: "map_infowindow_max_width"
title: "map_infowindow_max_width config"
description: "设置地图视图中地图上弹出标记的最大宽度。"
---

# map_infowindow_max_width

### Description

@short: 设置地图视图中地图上弹出标记的最大宽度。

@signature: map_infowindow_max_width: number

### Example

~~~jsx
scheduler.config.map_infowindow_max_width = 350;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** 300

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 此属性需要启用 [map_view](guides/extensions-list.md#mapview) 插件。 
:::

**infowindow_max_width** 选项也可以在 [map_settings](api/config/map_settings.md) 配置对象中设置。
