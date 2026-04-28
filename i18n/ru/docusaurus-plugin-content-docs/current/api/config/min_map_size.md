---
sidebar_label: min_map_size
title: "конфигурация min_map_size"
description: "задаёт минимально возможный размер отображения карты во время autoresize"
---

# min_map_size

### Description

@short: Определяет минимально возможный размер вида карты во время autoresize

@signature: min_map_size: number

### Example

~~~jsx
scheduler.config.min_map_size = 450;
~~~

**Значение по умолчанию:** 400

### Details

:::note
 Свойство требует включённого плагина [container_autoresize](guides/extensions-list.md#container-autoresize) для корректной работы.
:::

### Related API
- [container_autoresize](api/config/container_autoresize.md)
- [min_grid_size](api/config/min_grid_size.md)

### Related Guides
- [Full List of Extensions](guides/extensions-list.md#container-autoresize)
- [Map View](views/map.md#map-related-configuration-options)

### Change log
- добавлено в версии 4.4