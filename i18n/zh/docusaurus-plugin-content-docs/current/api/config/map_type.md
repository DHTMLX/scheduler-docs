---
sidebar_label: "map_type"
title: "map_type config"
description: "定义 Google Maps 的类型"
---

# map_type
:::warning 
此功能已棄用。
:::
### Description

@short: 定义 Google Maps 的类型

@signature: map_type: any

### Example

~~~jsx
scheduler.config.map_type = google.maps.MapTypeId.HYBRID;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"map");
~~~

**Default value:** ROADMAP

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 此属性需要启用 [map_view](guides/extensions-list.md#mapview) 插件。 
:::

### Change log
- 自 v7.1 起废弃
