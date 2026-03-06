---
sidebar_label: "map_type"
title: "map_type config"
description: "определяет тип Google Maps"
---

# map_type
:::warning
Эта функицональность устарела
::: 
### Description

@short: Определяет тип Google Maps

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
 Для использования этого свойства необходимо включить плагин [map_view](guides/extensions-list.md#mapview). 
:::

### Change log
- устарело с версии v7.1
