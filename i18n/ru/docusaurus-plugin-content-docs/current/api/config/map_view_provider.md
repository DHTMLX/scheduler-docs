---
sidebar_label: "map_view_provider"
title: "map_view_provider config"
description: "определяет, какой провайдер карты использовать"
---

# map_view_provider

### Description

@short: Определяет, какой провайдер карты использовать

@signature: map_view_provider: string

### Example

~~~jsx
scheduler.config.map_view_provider = "googleMap";
...
scheduler.init('scheduler_here', new Date(2024, 05, 11), "map");
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 Это свойство работает только если включён плагин [map_view](guides/extensions-list.md#mapview). 
:::

Также возможно задать провайдера карты внутри объекта конфигурации [map_settings](api/config/map_settings.md).

### Change log
- добавлено в v7.1
