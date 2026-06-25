---
sidebar_label: map_initial_position
title: "map_initial_position конфигурация"
description: "устанавливает начальное положение карты"
---

# map_initial_position
:::warning 
Свойство устарело
:::
### Description

@short: Устанавливает начальное положение карты

@signature: map_initial_position: any

### Example

~~~jsx
scheduler.config.map_initial_position =new google.maps.LatLng(51.477840, -0.001492);
...
scheduler.init('scheduler_here',new Date(2027,05,11),"map");
~~~

**Значение по умолчанию:** google.maps.LatLng(48.724, 8.215)

**Применимые представления:** [Map view](views/map.md)

### Details

:::note
 Свойство требует активированного плагина [map_view](guides/extensions-list.md#map-view) для активации. 
:::

### Related API
- [map_initial_zoom](api/config/map_initial_zoom.md)

### Change log
- устарело с версии v7.1