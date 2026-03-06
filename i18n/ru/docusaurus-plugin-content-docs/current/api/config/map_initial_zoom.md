---
sidebar_label: "map_initial_zoom"
title: "map_initial_zoom config"
description: "задаёт начальный уровень зума для карты в Map view"
---

# map_initial_zoom

### Description

@short: Задаёт начальный уровень зума для карты в Map view

@signature: map_initial_zoom: number

### Example

~~~jsx
scheduler.config.map_initial_zoom = 7;
...
scheduler.init('scheduler_here', new Date(2013,05,11), "week");
~~~

**Default value:** 1

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 Это свойство работает только при включённом плагине [map_view](guides/extensions-list.md#mapview). 
:::

**initial_zoom** также можно задать в объекте конфигурации [map_settings](api/config/map_settings.md).

### Related API
- [map_initial_position](api/config/map_initial_position.md)
