---
sidebar_label: map_infowindow_max_width
title: "map_infowindow_max_width config"
description: "максимальная ширина всплывающего маркера на карте в режиме отображения"
---

# map_infowindow_max_width

### Description

@short: Максимальная ширина всплывающего маркера на карте в режиме отображения

@signature: map_infowindow_max_width: number

### Example

~~~jsx
scheduler.config.map_infowindow_max_width = 350;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** 300

**Применимые представления:** [вид карты](views/map.md)

### Details

:::note
 Свойство требует активации плагина [map_view](guides/extensions-list.md#map-view).
 :::

Вы также можете указать настройку **infowindow_max_width** внутри конфигурационного объекта [map_settings](api/config/map_settings.md).