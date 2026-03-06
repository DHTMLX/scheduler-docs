---
sidebar_label: "map_resolve_event_location"
title: "map_resolve_event_location config"
description: "当事件的坐标尚未存储在数据库中时，启用自动尝试确定事件位置的功能"
---

# map_resolve_event_location

### Description

@short: 当事件的坐标尚未存储在数据库中时，启用自动尝试确定事件位置的功能

@signature: map_resolve_event_location: boolean

### Example

~~~jsx
scheduler.config.map_resolve_event_location = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** true

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 此功能需要启用 [map_view](guides/extensions-list.md#mapview) 插件。 
:::

**resolve_event_location** 选项也可以在 [map_settings](api/config/map_settings.md) 配置对象中设置。

- 启用（*true*）时，如果事件在数据库中缺少 'lat' 和 'lng' 值，scheduler 会在加载事件时尝试根据 'event_location' 字段确定坐标。如果成功识别位置，坐标将被保存回数据库。如果失败，scheduler 会触发 [onLocationError](api/event/onlocationerror.md) 事件。
- 该设置在迁移过程中尤其有用，但通常不建议在生产环境中使用。
