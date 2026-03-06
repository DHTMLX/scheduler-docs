---
sidebar_label: "map_resolve_user_location"
title: "map_resolve_user_location config"
description: "控制是否提示用户共享其位置以显示在地图上"
---

# map_resolve_user_location

### Description

@short: 控制是否提示用户共享其位置以显示在地图上

@signature: map_resolve_user_location: boolean

### Example

~~~jsx
scheduler.config.map_resolve_user_location = false;  
...  
scheduler.init('scheduler_here', new Date(2013,05,11), "week");
~~~

**Default value:** true

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 该属性需要启用 [map_view](guides/extensions-list.md#mapview) 插件。 
:::

**resolve_user_location** 设置也可以在 [map_settings](api/config/map_settings.md) 配置对象中定义。

某些浏览器提供访问用户位置的选项。当此选项设置为 *true* 时，地图加载时会提示用户共享其位置。
