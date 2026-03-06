---
sidebar_label: "map_infowindow_max_width"
title: "map_infowindow_max_width config"
description: "Устанавливает максимальную ширину всплывающего окна маркера на карте в Map view."
---

# map_infowindow_max_width

### Description

@short: Устанавливает максимальную ширину всплывающего окна маркера на карте в Map view.

@signature: map_infowindow_max_width: number

### Example

~~~jsx
scheduler.config.map_infowindow_max_width = 350;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** 300

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 Для использования этого свойства необходимо включить плагин [map_view](guides/extensions-list.md#mapview). 
:::

Опция **infowindow_max_width** также может быть задана в объекте конфигурации [map_settings](api/config/map_settings.md).
