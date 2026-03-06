---
sidebar_label: "map_zoom_after_resolve"
title: "map_zoom_after_resolve config"
description: "устанавливает уровень масштабирования для отображения местоположения пользователя, когда браузер запрашивает разрешение и пользователь соглашается"
---

# map_zoom_after_resolve

### Description

@short: Устанавливает уровень масштабирования для отображения местоположения пользователя, когда браузер запрашивает разрешение и пользователь соглашается

@signature: map_zoom_after_resolve: number

### Example

~~~jsx
scheduler.config.map_zoom_after_resolve = 10;
...
scheduler.init('scheduler_here', new Date(2013, 05, 11), "week");
~~~

**Default value:** 15

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 Свойство требует включения плагина [map_view](guides/extensions-list.md#mapview). 
:::

Настройка **zoom_after_resolve** также может быть определена внутри объекта конфигурации [map_settings](api/config/map_settings.md).
