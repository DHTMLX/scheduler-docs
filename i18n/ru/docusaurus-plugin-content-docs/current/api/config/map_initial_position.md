---
sidebar_label: "map_initial_position"
title: "map_initial_position config"
description: "задаёт начальное положение карты"
---

# map_initial_position
:::warning
Эта функицональность устарела
::: 
### Description

@short: Задаёт начальное положение карты

@signature: map_initial_position: any

### Example

~~~jsx
scheduler.config.map_initial_position = new google.maps.LatLng(51.477840, -0.001492);
...
scheduler.init('scheduler_here', new Date(2013,05,11), "map");
~~~

**Default value:** google.maps.LatLng(48.724, 8.215)

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 Для работы этого свойства необходимо включить плагин [map_view](guides/extensions-list.md#mapview). 
:::

### Related API
- [map_initial_zoom](api/config/map_initial_zoom.md)

### Change log
- устарело с версии v7.1
