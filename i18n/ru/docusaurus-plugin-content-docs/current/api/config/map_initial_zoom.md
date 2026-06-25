---
sidebar_label: map_initial_zoom
title: "конфигурация map_initial_zoom"
description: "устанавливает начальный масштаб карты в представлении Map"
---

# map_initial_zoom

### Description

@short: Устанавливает начальный масштаб карты во View Map

@signature: map_initial_zoom: number

### Example

~~~jsx
scheduler.config.map_initial_zoom = 7;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** 1

**Применимые представления:** [Map view](views/map.md)

### Details

:::note
 Свойство требует активации плагина [map_view](guides/extensions-list.md#map-view). 
:::

Вы также можете указать настройку **initial_zoom** внутри конфигурационного объекта [map_settings](api/config/map_settings.md).

### Related API
- [map_initial_position](api/config/map_initial_position.md)