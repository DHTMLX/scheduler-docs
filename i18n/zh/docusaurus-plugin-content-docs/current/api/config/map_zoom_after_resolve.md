---
sidebar_label: "map_zoom_after_resolve"
title: "map_zoom_after_resolve config"
description: "设置在浏览器请求权限且用户同意时，显示用户位置的缩放级别"
---

# map_zoom_after_resolve

### Description

@short: 设置在浏览器请求权限且用户同意时，显示用户位置的缩放级别

@signature: map_zoom_after_resolve: number

### Example

~~~jsx
scheduler.config.map_zoom_after_resolve = 10;
...
scheduler.init('scheduler_here', new Date(2027, 05, 11), "week");
~~~

**Default value:** 15

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 此属性需要启用 [map_view](guides/extensions-list.md#mapview) 插件。 
:::

**zoom_after_resolve** 设置也可以在 [map_settings](api/config/map_settings.md) 配置对象中定义。
