---
sidebar_label: "map_settings"
title: "map_settings config"
description: "包含与地图相关的配置选项"
---

# map_settings

### Description

@short: 包含与地图相关的配置选项

@signature: map_settings: any

### Example

~~~jsx
// 该示例展示了默认的地图设置
scheduler.config.map_settings = {
    initial_position: {
       lat: 48.724,
       lng: 8.215
    },
    error_position: {
       lat: 15,
       lng: 15
    },
    initial_zoom: 1,
    zoom_after_resolve: 15,
    info_window_max_width: 300,
    resolve_user_location: true,
    resolve_event_location: true,
    view_provider: "googleMap"
}
...
scheduler.init('scheduler_here',new Date(2027,05,11),"map");
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 此属性需要启用 [map_view](guides/extensions-list.md#mapview) 插件。 
:::

配置对象包含以下属性:

- **initial_position** - 定义地图的初始位置
- **error_position** - 当事件位置无法确定时显示的备用位置
- **initial_zoom** - 地图视图首次加载时的缩放级别
- **zoom_after_resolve** - 如果用户授权共享位置，显示用户位置时使用的缩放级别
- **info_window_max_width** - 地图上弹出标记的最大宽度
- **resolve_user_location** - 控制是否弹出提示请求用户共享其位置以显示在地图上
- **resolve_event_location** - 启用尝试查找事件位置（当数据库中未存储坐标时）
- **view_provider** - 选择地图服务提供商

可以在 **map_settings** 对象中添加自定义地图设置，例如令牌:

~~~js
scheduler.config.map_settings.accessToken = "pk.eyJ...";
~~~

### Change log
- 在 v7.1 中新增
